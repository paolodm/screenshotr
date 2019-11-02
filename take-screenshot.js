const puppeteer = require('puppeteer');
const URL = require('url').URL;
const path = require('path');

function generateFilename(urlStr) {
  const myUrl = new URL(urlStr);
  const protocol = myUrl.protocol.replace(':', '');
  const defaultPort = protocol === 'https' ? '443' : '80';
  const port = myUrl.port || defaultPort;
  return `${protocol}-${myUrl.hostname}-${port}`;
}

async function takeScreenshot(url, outputFolder='./') {
  const saveFolder = path.resolve(process.cwd(), outputFolder);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  console.log(`Taking screenshot of ${url}.`);

  await page.screenshot({path: `${saveFolder}/${generateFilename(url)}.png`});

  await browser.close();
}

module.exports = takeScreenshot;
