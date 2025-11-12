import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'node:path';

const configPath = path.resolve('scripts/lighthouse.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const distPath = path.resolve(config.distPath);
const reportPath = path.resolve(config.reportPath);
const nginxConfPath = path.resolve('scripts/nginx-lighthouse.conf');
const { port, thresholds } = config;
const urlToAnalyze = `http://localhost:${port}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const containerName = `lighthouse-nginx-${Date.now()}`;
  let nginxStarted = false;
  try {
    await startNginx(containerName);
    nginxStarted = true;
    const runnerResult = await runLighthouseAudit();
    saveReport(runnerResult.report);

    const categories = runnerResult.lhr.categories;
    logScores(categories);

    const failedCategories = getFailedCategories(categories, thresholds);

    if (failedCategories.length > 0) {
      console.error(`🔴 Thresholds not met for:\n   ${failedCategories.join('\n   ')}`);
      process.exitCode = 1;
    } else {
      console.log('🎉 All categories passed the configured thresholds');
    }
  } catch (err) {
    console.error('🔴 Error during execution:', err);
    process.exitCode = 1;
  } finally {
    if (nginxStarted) {
      stopNginx(containerName);
    }
  }
})();

async function startNginx(containerName) {
  try {
    execSync('docker info', { stdio: 'ignore' });
  } catch {
    throw new Error('🔴 Docker is not running. Please start Docker before continuing.');
  }

  process.stdout.write(`🚀 Starting Nginx on port ${port}   \n`);
  const spinner = createSpinner();
  spinner.start();
  execSync(
    `docker run -d --rm --name ${containerName} -p ${port}:80 -v ${path.resolve(
      distPath,
    )}:/usr/share/nginx/html:ro -v ${nginxConfPath}:/etc/nginx/nginx.conf:ro nginx:alpine`,
  );
  await sleep(2000);
  spinner.stop(true);
  console.log(`🟢 Nginx server is running at ${urlToAnalyze}`);
}

function logScores(categories) {
  console.log('📊 Lighthouse Scores:');
  for (const key of Object.keys(categories)) {
    const category = categories[key];
    const score = (category.score ?? 0) * 100;
    console.log(`   ${category.title}: ${score.toFixed(0)}/100`);
  }
}

function getFailedCategories(categories, thresholds) {
  return Object.entries(thresholds)
    .filter(([key, min]) => (categories[key]?.score ?? 0) * 100 < min)
    .map(([key]) => `${categories[key]?.title ?? key} (<${thresholds[key].toFixed(0)}%)`);
}

async function runLighthouseAudit() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    port: chrome.port,
    output: 'html',
    logLevel: 'error',
    onlyCategories: Object.keys(thresholds),
  };

  process.stdout.write('⚡ Running Lighthouse audit   \n');
  const spinner = createSpinner();
  spinner.start();

  try {
    const result = await lighthouse(urlToAnalyze, options);
    spinner.stop();
    process.stdout.write('\r🟢 Lighthouse audit completed\n');
    await chrome.kill();

    if (!result?.lhr) throw new Error('Lighthouse did not produce any results.');
    return result;
  } catch (err) {
    spinner.stop();
    process.stdout.write('\r🔴 Lighthouse audit failed.          \n\n');
    throw err;
  }
}

function saveReport(report) {
  fs.writeFileSync(reportPath, report);
  console.log(`💾 Report saved at: ${reportPath}`);
}

function stopNginx(containerName) {
  console.log('🧹 Stopping Docker container...');
  try {
    execSync(`docker stop $(docker ps -q --filter "name=${containerName}")`);
  } catch {}
}

function createSpinner() {
  let interval;
  let dots = 0;

  return {
    start() {
      interval = setInterval(() => {
        dots = (dots + 1) % 4;
        process.stdout.write(`\x1b[3D${'.'.repeat(dots)}${' '.repeat(3 - dots)}`);
      }, 400);
    },
    stop(clearLine = true) {
      clearInterval(interval);
      if (clearLine) {
        process.stdout.write('\r' + ' '.repeat(10) + '\r');
      }
    },
  };
}
