const puppeteer = require('puppeteer')
const fs = require('fs')

function extractItems() {
  const extractedElements = document.querySelectorAll('[id|="nav"]')
  const items = []
  for (let element of extractedElements) {
    items.push(element.innerText)
  }
  return items
}

void (async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://scrapethissite.com')
    const items = await page.evaluate(extractItems);
    fs.writeFileSync('items.txt', items.join('\n') + '\n')
    await browser.close()
  } catch (error) {
    console.log(error)
  }
})()
