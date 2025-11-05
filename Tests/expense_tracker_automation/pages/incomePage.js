import { By, until } from "selenium-webdriver";

export default class IncomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async addIncome(Source, amount, date) {

    const incomePage = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[1]/div/div[2]/button[2]')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(incomePage), 5000);
    await incomePage.click();

    const addBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div[1]/button')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(addBtn), 5000);
    await addBtn.click();

    await new Promise(resolve => setTimeout(resolve, 1000));


    const iconBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/p')),
      10000
    );
    await this.driver.wait(until.elementIsEnabled(iconBtn), 5000);
    await iconBtn.click();
    await new Promise(resolve => setTimeout(resolve, 1000));


    const iconSelector = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div[2]/aside/div[2]/ul/li[3]/div/button[9]/img')),
      10000
    );
    await this.driver.wait(until.elementIsEnabled(iconSelector), 5000);
    await iconSelector.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

   //Add Source

    const sourceField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(sourceField), 5000);
    await sourceField.sendKeys(Source);
    await new Promise(resolve => setTimeout(resolve, 1000));

  //Add amoun

    const amountField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[3]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(amountField), 5000);
    await amountField.sendKeys(amount);
    await new Promise(resolve => setTimeout(resolve, 1000));

//Add date    
    const dateField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[4]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(dateField), 5000);
    await dateField.sendKeys(date);
    await new Promise(resolve => setTimeout(resolve, 1000));

//Click Submit button

    const submitBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[5]/button')),
      10000
    );
    await this.driver.wait(until.elementIsEnabled(submitBtn), 5000);
    await submitBtn.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

    //check hte  income point

    const bars = await this.driver.wait(
      until.elementsLocated(By.css('path.recharts-rectangle')),
      10000
    );

    if (bars.length === 0) {
      throw new Error("❌ No bars found in the income chart!");
    }


    const lastBar = bars[bars.length - 1];
    await this.driver.wait(until.elementIsVisible(lastBar), 5000);
    await lastBar.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

    //Download income report
    const downloadBtn = await this.driver.wait(
    until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div/div/div[2]/div[1]/button')),
    10000
    );
    await this.driver.wait(until.elementIsEnabled(downloadBtn), 5000);
    await downloadBtn.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

//income delete Test

    const deleteBtn = await this.driver.wait(
      until.elementLocated(By.css(".group:nth-child(1) .text-gray-400 > svg")),
      10000
    );
    await this.driver.wait(until.elementIsEnabled(deleteBtn), 5000);
    await deleteBtn.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const confirmButton = await this.driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div/button')),
        5000
      );
      await confirmButton.click();
    } catch (err) {
      console.log("⚠️ No confirmation button appeared, continuing...");
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
