//scrape.js
const { Builder, By, until } = require('selenium-webdriver');
const axios = require('axios');
const uuid = require('uuid');
require('chromedriver'); // Ensure chromedriver is installed

(async function scrapeAndSend() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://x.com/home');

        // Accept cookies if present
        try {
            let acceptCookiesButton = await driver.wait(until.elementLocated(By.xpath("//button[.//span[contains(text(), 'Accept all cookies')]]")), 10000);
            await acceptCookiesButton.click();
        } catch (error) {
            console.log("No cookies button found or click timeout exceeded, proceeding without clicking.");
        }

        // Log in to Twitter
        try {
            let loginButton = await driver.wait(until.elementLocated(By.css('div a[href="/login"]')), 10000);
            await loginButton.click();

            let usernameInput = await driver.wait(until.elementLocated(By.css('div input[autocomplete="username"]')), 10000);
            await usernameInput.sendKeys('petersam1211');

            let nextButton = await driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'css-146c3p1')]//span[contains(text(), 'Next')]")), 10000);
            await nextButton.click();

            let passwordInput = await driver.wait(until.elementLocated(By.css('div input[autocomplete="current-password"]')), 10000);
            await passwordInput.sendKeys('khankhan321@');

            let loginSubmitButton = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(), 'Log in')]")), 10000);
            await loginSubmitButton.click();
        } catch (error) {
            console.log("Error during login process: ", error);
            return;
        }

        // Wait for trends to load
        try {
            await driver.wait(until.elementsLocated(By.xpath('//*[@data-testid="trend"]/div/div[2]/span')), 30000);
        } catch (error) {
            console.log("Error waiting for trends to load: ", error);
            return;
        }

        let trends;
        try {
            trends = await driver.findElements(By.xpath('//*[@data-testid="trend"]/div/div[2]/span'));
        } catch (error) {
            console.log("Error finding trends: ", error);
            return;
        }

        let trendData = {
            id: uuid.v4(),
            nameoftrend1: trends[0] ? await trends[0].getText() : "N/A",
            nameoftrend2: trends[1] ? await trends[1].getText() : "N/A",
            nameoftrend3: trends[2] ? await trends[2].getText() : "N/A",
            nameoftrend4: trends[3] ? await trends[3].getText() : "N/A",
            nameoftrend5: trends[4] ? await trends[4].getText() : "N/A",
            ip_address: await axios.get('https://api64.ipify.org?format=json').then(res => res.data.ip).catch(() => 'N/A')
        };

        // Send data to MongoDB through Express server
        try {
            await axios.post('http://localhost:3000/trends', trendData);
            console.log("Data sent successfully!");
        } catch (error) {
            console.log("Error sending data to MongoDB: ", error);
        }

    } finally {
        await driver.quit();
    }
})();
