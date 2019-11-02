const puppeteer = require('puppeteer');
const URL = require('url').URL;

function generateFilename(urlStr) {
  const myUrl = new URL(urlStr);
  const protocol = myUrl.protocol.replace(':', '');
  const defaultPort = protocol === 'https' ? '443' : '80';
  const port = myUrl.port || defaultPort;
  return `${protocol}-${myUrl.hostname}-${port}`;
}

async function takeScreenshot(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  console.log(`Taking screenshot of ${url}.`);
  await page.screenshot({path: `${generateFilename(url)}.png`});

  await browser.close();
}

module.exports = takeScreenshot;
