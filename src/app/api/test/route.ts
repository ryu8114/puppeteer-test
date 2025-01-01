import chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export async function GET(_request: NextRequest) {
  try {
    // ブラウザを起動
    const executablePath = process.env.NODE_ENV === 'production'
    ? await chromium.executablePath()
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

    const browser = await puppeteer.launch({
      executablePath,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      headless: true,
      ignoreHTTPSErrors: true,
    });

    try {
      // ブラウザのタブを開く
      const page = await browser.newPage();

      // スクショ対象のページにアクセス
      await page.goto("https://www.google.com", {
        waitUntil: "networkidle0",
        timeout: 30000
      });

      // ページの表示が完了するまで待つ
      await page.waitForSelector("body", { 
        visible: true,
        timeout: 5000 
      });

      // スクリーンショットを撮影
      const image = await page.screenshot({
        encoding: "base64",
        fullPage: false,
        clip: { x: 0, y: 0, width: 1080, height: 1920 }
      });

      return NextResponse.json({ status: "OK", image }, { status: 200 });
    } catch (error) {
      console.error('Operation error:', error);
      return NextResponse.json(
        { status: "ERROR" },
        { status: 500 }
      );
    } finally {
      // ブラウザを必ず閉じる
      await browser.close();
    }
  } catch (error) {
    console.error('Browser launch error:', error);
    return NextResponse.json(
      { status: "ERROR" },
      { status: 500 }
    );
  }
}