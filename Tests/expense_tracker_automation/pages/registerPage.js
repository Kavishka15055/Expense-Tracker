import { By, until } from "selenium-webdriver";

export default class RegisterPage {
  constructor(driver) {
    this.driver = driver;
  }

  async signup(fullName, email, password) {
    // Fill in full name
    const fullNameField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div[1]/div[1]/div/input')),
      5000
    );
    await fullNameField.sendKeys(fullName);

    // Email field
    const emailField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div[1]/div[2]/div/input')),
      5000
    );
    await emailField.sendKeys(email);

    // Password field
    const passwordField = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/div[2]/div[2]/div/div/input')),
      5000
    );
    await passwordField.sendKeys(password);

    // Submit button
    const submitButton = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/button')),
      5000
    );
    await submitButton.click();

    // Wait for either error message or success
    try {
      // Check for "user already exists"
      const errorMsg = await this.driver.wait(
        until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/p[1]')),
        5000
      );

      if (errorMsg) {
        console.log("⚠️ User already exists. Redirecting to login page...");
        const loginLink = await this.driver.findElement(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/form/p/a'));
        await loginLink.click();
        return; // stop further execution
      }
    } catch (err) {
      // No error → signup successful
      console.log("✅ User registered successfully! Redirecting to login page...");

      // Navigate directly to login page (instead of clicking a non-existent link)
      await this.driver.get("http://localhost:5173/login"); // <-- replace with your login URL
    }
  }
}
