const puppeteer = require('puppeteer')
const fs = require('fs')
const readline = require('readline')

function extractItems() {
  const extractedElements = document.querySelectorAll('[role=article]')
  const items = []
  for (let element of extractedElements) {
    items.push(element.innerText)
  }
  return items
}

void (async () => {
  try {
    const rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout,
    })
    console.log('Which twitter profile should I access?')
    const it = rl[Symbol.asyncIterator]();
    const profile = await it.next()
    const browser = await puppeteer.launch({
                headless: false,
    })
    const page = await browser.newPage()
    await page.goto('https://twitter.com/'+profile.value)
    await page.waitForSelector('[role=article]', {
      visible: true,
    })
    const items = await page.evaluate(extractItems);
    fs.writeFileSync('items.txt', items.join('\n') + '\n')
    await browser.close()
    await rl.close()
  } catch (error) {
    console.log(error)
  }
})()
