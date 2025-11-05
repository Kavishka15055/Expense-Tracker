import { By, until } from "selenium-webdriver";

export default class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async login(email, password) {
    // Wait for email field
    const emailField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[1]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(emailField), 5000);
    await emailField.sendKeys(email);

    // Wait for password field
    const passwordField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div/input')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(passwordField), 5000);
    await passwordField.sendKeys(password);

    // Wait for login button and click
    const loginButton = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/button')),
      10000
    );
    await this.driver.wait(until.elementIsEnabled(loginButton), 5000);
    await loginButton.click();
    //  await driver.sleep(2000);
  }
}
