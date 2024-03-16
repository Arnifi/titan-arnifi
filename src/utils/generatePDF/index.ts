"use server";

import puppeteer from "puppeteer";

const generatePdfBuffer = async (htmlTemp: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(htmlTemp);
  const buffer = await page.pdf({
    format: "A4",
    margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
    printBackground: true,
    preferCSSPageSize: true,
    footerTemplate: "Page {{page}} of {{toPage}}",
  });
  await browser.close();
  return buffer;
};

export default generatePdfBuffer;
