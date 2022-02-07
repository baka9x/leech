const { Builder, By, Key, util } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function index() {
    let chrome_options = new chrome.Options().addArguments("disable-infobars")

    
    const driver = new Builder()
	.setChromeOptions(chrome_options)
	.forBrowser('chrome')
	.build();


    

    await driver.get("https://manga18fx.com/manga/gomusin/chapter-9")
    await sleep(10000); // sleep for 10 seconds
    //await driver.findElement(By.name("q")).sendKeys("Baka", Key.RETURN)

}

index()