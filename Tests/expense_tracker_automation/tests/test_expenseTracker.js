import { Builder, By, until } from "selenium-webdriver";
import edge from "selenium-webdriver/edge.js";
import { CONFIG } from "../config/config.js";
import LoginPage from "../pages/loginPage.js";
import ExpensePage from "../pages/expensePage.js";
import RegisterPage from "../pages/registerPage.js";
import IncomePage from "../pages/incomePage.js";
import DashboardPage from "../pages/dashboardPage.js";
import { describe, it, before, after } from "mocha";

let driver;

describe("Expense Tracker Login Test", function () {
  this.timeout(60000);

  before(async function () {
    console.log("🚀 Launching Edge browser...");
    const options = new edge.Options();
    driver = await new Builder()
      .forBrowser("MicrosoftEdge")
      .setEdgeOptions(options)
      .build();
    await driver.manage().window().maximize();
    await driver.get(CONFIG.BASE_URL);

    // Wait for login form to appear
    await driver.wait(until.elementLocated(By.css("form")), 10000);
  });

  after(async function () {
    console.log("🧹 Closing browser...");
    await driver.quit();
  });

    it("should sign in successfully", async function () {
    console.log("🧪 Running sign in test");

    const registerPage = new RegisterPage(driver); 

    const email = "test@example.com";
    const password = "test@123";
    const fullName= "test"
    

    await registerPage.signup(email, password,fullName);

    console.log("✅ Sign up test completed successfully!");
  });

  afterEach(async function () {
  await driver.sleep(1000);
});

  it("should log in successfully", async function () {
    console.log("🧪 Running login test");

    const loginPage = new LoginPage(driver);

    const email = "test@example.com";
    const password = "test@123";
    

    await loginPage.login(email, password);

    console.log("✅ Login test completed successfully!");
  });


    afterEach(async function () {
  await driver.sleep(1000);
    });

it("should add income successfully", async function () {
  console.log("🧪 Running add income test");

  const incomePage = new IncomePage(driver);

  const Source = "Salary";
  const amount = "10000";
  const date = "11/03/2025";
  await incomePage.addIncome(Source, amount, date);
  
  console.log("✅ income add test completed successfully!");
});

    afterEach(async function () {
  await driver.sleep(1000);
    });
    
it("should add expenses successfully", async function () {
  console.log("🧪 Running add expense test");

  const expensePage = new ExpensePage(driver);

  const category = "food";
  const amount = "100";
  const date = "11/03/2025";

  // Correct method call
  await expensePage.addExpense(category, amount, date);

  console.log("✅ Expenses add test completed successfully!");
});

    afterEach(async function () {
  await driver.sleep(1000);
    });

it("should dashboard work successfully", async function () {
  console.log("🧪 Running dashboard test");

  const dashboardPage = new DashboardPage(driver);
  await dashboardPage.testDashboardPage();

  console.log("✅ Dashboard test completed successfully!");
});

    afterEach(async function () {
  await driver.sleep(1000);
    });



});

