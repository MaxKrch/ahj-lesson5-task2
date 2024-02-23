import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('validNumber', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.buttons-block');
    const input = await form.$('.input-text');
    await input.type('5555555555555557');
    const submit = await form.$('.input-button');
    submit.click();
    await page.waitForSelector('.valid')
  });

   test('inValidNumber', async () => {
    await page.goto(baseUrl);
   
  });
});