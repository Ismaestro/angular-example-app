import { execSync, spawn } from 'child_process';
import waitOn from 'wait-on';

const urlToTest = 'http://localhost:4200';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let ngProcess;

  try {
    console.log('🚀 Starting Angular app with ng serve...');
    ngProcess = spawn('npx', ['ng', 'serve', '--configuration=localhost-en'], {
      stdio: 'inherit',
      shell: true,
    });

    console.log(`⏳ Waiting for ${urlToTest} to be ready...`);
    await waitOn({ resources: [urlToTest], timeout: 30000 });
    console.log('🟢 Angular app is ready');

    console.log('⚡ Running Playwright E2E tests...');
    execSync('npm run test:smoke:local', { stdio: 'inherit' });
    console.log('✅ Playwright tests completed successfully');
  } catch (err) {
    console.error('🔴 Error during E2E execution:', err);
    process.exitCode = 1;
  } finally {
    if (ngProcess) {
      console.log('🧹 Stopping Angular server...');
      ngProcess.kill('SIGINT');
      await sleep(1000);
    }
  }
})();
