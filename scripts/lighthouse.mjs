import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'node:path';

const CONFIG_PATH = path.resolve('lighthouse.config.json');
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('❌ No se encontró el archivo lighthouse.config.json');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const { distPath, reportPath, port, thresholds } = config;

const URL = `http://localhost:${port}`;

(async () => {
  console.log(`🚀 Sirviendo build desde ${distPath}...`);
  const server = spawn('npx', ['serve', distPath, '-l', port], { stdio: 'inherit' });

  // wait for server to be ready
  await new Promise((res) => setTimeout(res, 3000));

  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    port: chrome.port,
    output: 'html',
    logLevel: 'info',
    onlyCategories: Object.keys(thresholds),
  };

  const runnerResult = await lighthouse(URL, options);

  if (!runnerResult || !runnerResult.lhr) {
    console.error('❌ No se pudo ejecutar Lighthouse correctamente.');
    await chrome.kill();
    server.kill();
    process.exit(1);
  }

  fs.writeFileSync(reportPath, runnerResult.report);
  console.log(`\n✅ Informe guardado en ${reportPath}`);

  const categories = runnerResult.lhr.categories;
  console.log('📊 Resultados:');
  for (const key of Object.keys(categories)) {
    const category = categories[key];
    const score = (category.score ?? 0) * 100;
    console.log(`   ${category.title}: ${score.toFixed(0)} / 100`);
  }

  const failed = Object.entries(thresholds)
    .filter(([key, min]) => (categories[key]?.score ?? 0) * 100 < min)
    .map(([key]) => `${categories[key]?.title ?? key} (<${(thresholds[key] * 100).toFixed(0)}%)`);

  await chrome.kill();
  server.kill();

  if (failed.length > 0) {
    console.error(
      `\n❌ Las siguientes categorías no alcanzaron su umbral:\n   ${failed.join('\n   ')}`,
    );
    process.exit(1);
  }

  console.log('\n🎉 Todas las categorías superaron los umbrales configurados ✅');
})();
