import http from 'http';
import https from 'https';
import puppeteer from 'puppeteer';
import { Request, Response } from 'express';

import AppError from '../errors/AppError';

async function checkUrlIsValid(url: string) {
  let urlIsValid = false;

  try {
    http.get(url);
    urlIsValid = true;
  } catch {}

  if (!urlIsValid)
    try {
      https.get(url);
      urlIsValid = true;
    } catch {}

  return urlIsValid;
}

class PdfController {
  constructor() {}

  async getPdf(request: Request, response: Response) {
    const { url } = request.query;

    if (!url) throw new AppError('Envia a URL, imbecil.');

    const urlIsValid = await checkUrlIsValid(String(url));

    if (!urlIsValid) throw new AppError('URL inválida, imbecil.');

    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto(String(url), {
      waitUntil: 'networkidle0',
    });

    const pdf = await page.pdf({ format: 'a4' });

    await browser.close();

    response.set('Content-Type', 'application/pdf');

    return response.send(pdf);
  }
}

export default PdfController;
