const puppeteer = require('puppeteer')

void (async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://scrapethissite.com')
    await page.screenshot({
      path: 'page1.png'
    })
    await browser.close()
  } catch (error) {
    console.log(error)
  }
})()
