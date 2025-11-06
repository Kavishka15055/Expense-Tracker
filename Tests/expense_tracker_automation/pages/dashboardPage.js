import { By, until } from "selenium-webdriver";

export default class DashboardPage {
  constructor(driver) {
    this.driver = driver;
  }

  async testDashboardPage() {
    //navigate to dashboard Page 
    const dashboardPage = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[1]/div/div[2]/button[1]')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(dashboardPage), 5000);
    await dashboardPage.click();
    //navigate to Expenses page
    const expenseText = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div[5]/div[1]/h5')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(expenseText), 5000);
    await expenseText.click();
    await new Promise(resolve => setTimeout(resolve, 2500));

    const expenseBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div[3]/div[1]/button')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(expenseBtn), 5000);
    await expenseBtn.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    //again navigate to dashboard
    const dashboardPage2 = await this.driver.wait(
    until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[1]/div/div[2]/button[1]')),
    10000
    );
    await this.driver.wait(until.elementIsVisible(dashboardPage2), 5000);
    await dashboardPage2.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

        //navigate to Income page
    const incomeText = await this.driver.wait(
    until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div[6]')),
    10000
    );
    await this.driver.wait(until.elementIsVisible(incomeText), 5000);
    await incomeText.click();
    await new Promise(resolve => setTimeout(resolve, 2500));
    const incomeBtn = await this.driver.wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[2]/div/div[2]/div[6]/div[1]/button')),
      10000
    );
    await this.driver.wait(until.elementIsVisible(incomeBtn), 5000);
    await incomeBtn.click();
    // console.log("✅ income page navigation successfully!");
    await new Promise(resolve => setTimeout(resolve, 1000));

        //again navigate to dashboard
    const dashboardPage3 = await this.driver.wait(
    until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/div[2]/div[1]/div/div[2]/button[1]')),
    10000
    );
    await this.driver.wait(until.elementIsVisible(dashboardPage3), 5000);
    await dashboardPage3.click();
    await new Promise(resolve => setTimeout(resolve, 1000));

  
  //Test the Financial Overview 

try {
  const allCharts = await this.driver.wait(
    until.elementsLocated(By.css("svg.recharts-surface")),
    15000
  );
  const firstChart = allCharts[0];

  await this.driver.sleep(2500);

  let sectors = await firstChart.findElements(By.css("path.recharts-sector"));
  if (sectors.length === 0) {
    await this.driver.sleep(1500);
    sectors = await firstChart.findElements(By.css("path.recharts-sector"));
  }

  for (let i = 0; i < sectors.length; i++) {
    const fill = await sectors[i].getAttribute("fill");
  }

  //Select the first sector 
  const firstSector = await sectors[0]; // Resolve the first one
  await this.driver.wait(until.elementIsVisible(firstSector), 5000);
  await this.driver.executeScript("arguments[0].scrollIntoView(true);", firstSector);
  await this.driver.sleep(500);

  //Try normal click first
  try {
    await firstSector.click();

  } catch (clickErr) {
    // JS click fallback — ensure it's a DOM element
    const el = await firstSector.getWebElement
      ? await firstSector.getWebElement()
      : firstSector;
    await this.driver.executeScript("arguments[0].dispatchEvent(new MouseEvent('click', {bubbles:true}));", el);
  }

  await this.driver.sleep(1000);

} catch (err) {

}

// await new Promise(resolve => setTimeout(resolve, 1000));



    //Test the Last 60 Days Income
try {

  const allCharts = await this.driver.wait(
    until.elementsLocated(By.css("svg.recharts-surface")),
    15000
  );
  // Target the first pie chart
  const firstChart = allCharts[2];

  await this.driver.sleep(2500);

  let sectors = await firstChart.findElements(By.css("path.recharts-sector"));
  if (sectors.length === 0) {
    await this.driver.sleep(1500);
    sectors = await firstChart.findElements(By.css("path.recharts-sector"));
  }

  // Log colors
  for (let i = 0; i < sectors.length; i++) {
    const fill = await sectors[i].getAttribute("fill");
  }

  //Select the first sector (#875CF5)
  const firstSector = await sectors[0]; // Resolve the first one
  await this.driver.wait(until.elementIsVisible(firstSector), 5000);
  await this.driver.executeScript("arguments[0].scrollIntoView(true);", firstSector);
  await this.driver.sleep(500);

  // Try normal click first
  try {
    await firstSector.click();

  } catch (clickErr) {
    // JS click fallback — ensure it's a DOM element
    const el = await firstSector.getWebElement
      ? await firstSector.getWebElement()
      : firstSector;
    await this.driver.executeScript("arguments[0].dispatchEvent(new MouseEvent('click', {bubbles:true}));", el);
  }

  await this.driver.sleep(1000);
} catch (err) {

}

  }
}
//now i change
//lllll
