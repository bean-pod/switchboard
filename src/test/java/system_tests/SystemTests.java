package system_tests;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import features.AuthorizedTestRestTemplate;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.beanpod.switchboard.SwitchboardApplication;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.openapitools.model.DecoderModel;
import org.openapitools.model.DeviceModel;
import org.openapitools.model.EncoderModel;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(
    classes = SwitchboardApplication.class,
    webEnvironment = WebEnvironment.DEFINED_PORT)
@Import(AuthorizedTestRestTemplate.class)
@TestInstance(Lifecycle.PER_CLASS)
public class SystemTests {

  @Autowired private TestRestTemplate testRestTemplate;

  private WebDriver driver;

  @BeforeAll
  void setUp() {
    // Set up Selenium Chrome Driver
    if (System.getProperty("os.name").toLowerCase().contains("windows")) {
      System.setProperty(
          "webdriver.chrome.driver", "src\\test\\java\\system_tests\\chromedriver.exe");
    } else {
      System.setProperty("webdriver.chrome.driver", "src/test/java/system_tests/chromedriver");
    }
    driver = new ChromeDriver();
    driver.manage().window().setSize(new Dimension(1280, 1024));
    driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
  }

  @AfterAll
  void tearDown() {
    driver.quit();
  }

  @Test
  @Order(1)
  void testLogin() {
    // Go to Login Page
    driver.get("http://localhost:3000/login");

    // Log in
    driver.findElement(By.id("username")).sendKeys("admin");
    driver.findElement(By.id("password")).sendKeys("admin");
    driver.findElement(By.id("password")).sendKeys(Keys.ENTER);

    // Check login
    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(
          (ExpectedCondition<Boolean>)
              d -> d.findElement(By.className("title")).getText().equals("Dashboard"));
    }

    assertEquals("http://localhost:3000/Home", driver.getCurrentUrl());
  }

  @Test
  @Order(2)
  void testAddEncoder() throws InterruptedException {
    // Mock sender self-registration
    testRestTemplate.postForObject(
        "http://localhost:8080/device", DeviceFixture.getDeviceModel(), DeviceModel.class);
    testRestTemplate.postForObject(
        "http://localhost:8080/encoder",
        EncoderFixture.getEncoderModelWithOutputChannel(),
        EncoderModel.class);

    // Go to List of Senders
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View Senders')]")).click();

    // Check for encoder
    Thread.sleep(3000);
    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table
    List<WebElement> encodersRows =
        encodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        encodersRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(
                            EncoderFixture.getEncoderModelWithOutputChannel()
                                .getDevice()
                                .getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
  @Order(3)
  void testDeviceCreatedLog() throws InterruptedException {
    // Go to list of logs
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View All')]")).click();

    // Check for device created log
    Thread.sleep(3000);
    WebElement logsTable = driver.findElement(By.tagName("table")); // find logs table
    List<WebElement> logsRows =
        logsTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        logsRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(
                            "Device with serial number "
                                + EncoderFixture.getEncoderModelWithOutputChannel()
                                    .getDevice()
                                    .getSerialNumber()
                                + " has been created"));

    assertTrue(assertValue);
  }

  @Test
  @Order(4)
  void testAddDecoder() throws InterruptedException {
    // mock receiver self-registration
    testRestTemplate.postForObject(
        "http://localhost:8080/decoder",
        DecoderFixture.getDecoderModelWithInputChannel(),
        DecoderModel.class);

    // Go to List of Receivers
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View Receivers')]")).click();

    // Check for decoder
    Thread.sleep(3000);
    WebElement decodersTable = driver.findElement(By.tagName("table")); // find decoders table
    List<WebElement> decodersRows =
        decodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        decodersRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(
                            DecoderFixture.getDecoderModelWithInputChannel()
                                .getDevice()
                                .getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
  @Order(5)
  void testCreateStream() throws InterruptedException {
    // Go to create stream page
    Thread.sleep(1000);
    driver.findElement(By.xpath("//a[contains(@href, '/Streams/New')]")).click();

    // Create new stream
    Thread.sleep(1000);
    driver
        .findElement(By.xpath("//div[@id='root']/div[2]/div[3]/div/div/div/div/button/span"))
        .click();
    Thread.sleep(1000);
    driver
        .findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[2]/div/div/ul/div/div/span"))
        .click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();
    Thread.sleep(1000);
    driver
        .findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[2]/div/div[2]/ul/div/div/span"))
        .click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();
    Thread.sleep(1000);
    driver
        .findElement(By.xpath("//div[@id='root']/div[2]/div[3]/div[3]/div/div/div/button/span"))
        .click();
    Thread.sleep(1000);
    driver
        .findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[2]/div/div/ul/div/div/span"))
        .click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();
    Thread.sleep(1000);
    driver
        .findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[2]/div/div[2]/ul/div/div/span"))
        .click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='root']/div[2]/div[3]/div[4]/button/span")).click();

    // Go to view streams page
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Active Streams')]")).click();

    // Check for stream creation
    Thread.sleep(3000);
    WebElement streamsTable = driver.findElement(By.tagName("table")); // find streams table
    List<WebElement> streamsRows =
        streamsTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue = streamsRows.stream().anyMatch(row -> row.getText().contains("Online"));

    assertTrue(assertValue);
  }

  @Test
  @Order(6)
  void testStreamStartedLog() throws InterruptedException {
    // Go to list of logs
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View All')]")).click();

    // Check for stream started log
    Thread.sleep(3000);
    WebElement logsTable = driver.findElement(By.tagName("table")); // find logs table
    List<WebElement> logsRows =
        logsTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        logsRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(
                            "A stream started from "
                                + EncoderFixture.getEncoderModelWithOutputChannel()
                                    .getOutput()
                                    .stream()
                                    .findFirst()
                                    .get()
                                    .getChannel()
                                    .getName()
                                + " of encoder "
                                + EncoderFixture.getEncoderModelWithOutputChannel()
                                    .getSerialNumber()
                                + " to "
                                + DecoderFixture.getDecoderModelWithInputChannel()
                                    .getInput()
                                    .stream()
                                    .findFirst()
                                    .get()
                                    .getChannel()
                                    .getName()
                                + " of decoder "
                                + DecoderFixture.getDecoderModelWithInputChannel()
                                    .getSerialNumber()));

    assertTrue(assertValue);
  }

  @Test
  @Order(7)
  void testDeleteStream() throws InterruptedException {
    // Go to view streams page
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//button[contains(.,'See More')]")).click();

    // Delete previously created stream
    Thread.sleep(1000);
    driver.findElement(By.cssSelector(".MuiTableCell-root > a .MuiSvgIcon-root")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='root']/div[2]/div[3]/div[2]/button/span")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//div[@id='dialog']/div[3]/div/div[3]/button[2]/span")).click();

    // Check for stream deletion
    Thread.sleep(3000);
    WebElement streamsTable = driver.findElement(By.tagName("table")); // find streams table
    List<WebElement> streamsRows =
        streamsTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue = streamsRows.stream().anyMatch(row -> row.getText().contains("Online"));

    assertFalse(assertValue);
  }

  @Test
  @Order(8)
  void testRenameDevice() throws InterruptedException {
    String rename = "Renamed Device";

    // Go to List of Senders
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View Senders')]")).click();

    // View Sender Device Details
    Thread.sleep(1000);
    driver.findElement(By.cssSelector(".MuiTableCell-root > a .MuiSvgIcon-root")).click();

    // Rename Sender Device
    Thread.sleep(1000);
    driver.findElement(By.cssSelector("#editBtn .MuiSvgIcon-root")).click();
    Thread.sleep(1000);
    driver
        .findElement(
            By.xpath(
                "//div[@id='root']/div[2]/div[3]/div/div/div/div/div/div/div/div/table/tbody/tr/td[2]"))
        .click();
    driver.findElement(By.id("deviceName")).clear();
    driver.findElement(By.id("deviceName")).sendKeys(rename);
    Thread.sleep(1000);
    driver.findElement(By.cssSelector("#confirmEditBtn path")).click();

    // Go to List of Senders
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View Senders')]")).click();

    // Check for renamed Sender
    Thread.sleep(3000);
    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table
    List<WebElement> encodersRows =
        encodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue = encodersRows.stream().anyMatch(row -> row.getText().contains(rename));

    assertTrue(assertValue);
  }

  @Test
  @Order(9)
  void testCreateUser() throws InterruptedException {
    // Go to create user page
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Home')]")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'Create a User')]")).click();

    // Enter new user credentials
    driver.findElement(By.id("username")).sendKeys("user1");
    driver.findElement(By.id("password")).sendKeys("user1");
    driver.findElement(By.id("password")).sendKeys(Keys.ENTER);

    // Sign out
    Thread.sleep(1000);
    driver.findElement(By.cssSelector("#acctBtn .MuiSvgIcon-root")).click();
    Thread.sleep(1000);
    driver.findElement(By.xpath("//p[contains(.,'Logout')]")).click();

    // Sign in with new user
    driver.findElement(By.id("username")).sendKeys("user1");
    driver.findElement(By.id("password")).sendKeys("user1");
    driver.findElement(By.id("password")).sendKeys(Keys.ENTER);

    // Check login
    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(
          (ExpectedCondition<Boolean>)
              d -> d.findElement(By.className("title")).getText().equals("Dashboard"));
    }

    assertEquals("http://localhost:3000/Home", driver.getCurrentUrl());
  }

  @Test
  @Order(10)
  void testRestrictAccessToDevices() throws InterruptedException {
    // Go to List of Receivers
    Thread.sleep(1000);
    driver.findElement(By.xpath("//span[contains(.,'View Receivers')]")).click();

    // Check for admin decoder not to be present
    Thread.sleep(3000);
    WebElement decodersTable = driver.findElement(By.tagName("table")); // find encoders table
    List<WebElement> decodersRows =
        decodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        decodersRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(
                            DecoderFixture.getDecoderModelWithInputChannel()
                                .getDevice()
                                .getDisplayName()));

    assertFalse(assertValue);
  }
}
