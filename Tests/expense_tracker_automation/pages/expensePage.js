import { By, until } from "selenium-webdriver";

export default class ExpensePage {
  constructor(driver) {
    this.driver = driver;
  }

  async addExpense(category, amount, date) {
    //navigate to expense pase
    const expensePage = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[1]/div/div[2]/button[3]')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(expensePage), 5000);
    await expensePage.click();
    // Wait for and click Add Expense button
    const addBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div[1]/button')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(addBtn), 5000);
    await addBtn.click();

    // Fill expense name
    const categoryField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(categoryField), 5000);
    await categoryField.sendKeys(category);

    // Fill expense amount
    const amountField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[3]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(amountField), 5000);
    await amountField.sendKeys(amount);

    // Fill expense date
    const dateField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[4]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(dateField), 5000);
    await dateField.sendKeys(date);

    // Click submit button
    const submitBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div/div/div[2]/div/div[5]/button')),
      10000
    );
    await this.driver.wait(until.elementIsEnabled(submitBtn), 5000);
    await submitBtn.click();
  }
}
