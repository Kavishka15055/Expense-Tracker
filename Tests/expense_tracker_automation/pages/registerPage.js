import { By, until } from "selenium-webdriver";

export default class RegisterPage {
  constructor(driver) {
    this.driver = driver;
  }

  async signup(fullName, email, password) {


    // Fill in fields
    const fullNameField = await this.driver.findElement(
      By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div[1]/div[1]/div/input')
    );
    await fullNameField.sendKeys(fullName);

    const emailField = await this.driver.findElement(
      By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div[1]/div[2]/div/input')
    );
    await emailField.sendKeys(email);

    const passwordField = await this.driver.findElement(
      By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div[2]/div/div/input')
    );
    await passwordField.sendKeys(password);

    const submitButton = await this.driver.findElement(
      By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/button')
    );
    await submitButton.click();

    // Wait for either success or "user already exists" message
    try {
      // Adjust this XPath to match your app's error message
      const errorMsg = await this.driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/p[1]')),
        5000
      );
        

      if (errorMsg) {
        console.log("⚠️ User already exists. Redirecting to login page...");
        // Click login link/button if exists
        const loginLink = await this.driver.findElement(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/p[2]/a'));
        await loginLink.click();
      }
    } catch (err) {
      // No error message appeared → user registered successfully
      console.log("✅ User registered successfully!");
    }
  }
}
