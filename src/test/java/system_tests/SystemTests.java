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
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
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
    driver.get("http://localhost:3000/login");

    driver.findElement(By.id("username")).sendKeys("admin");
    driver.findElement(By.id("password")).sendKeys("admin");
    driver.findElement(By.cssSelector(".MuiButton-label")).click();

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
  void testAddEncoder() {
    // Mock sender self-registration

    testRestTemplate.postForObject(
        "http://localhost:8080/device", DeviceFixture.getDeviceModel(), DeviceModel.class);
    testRestTemplate.postForObject(
        "http://localhost:8080/encoder",
        EncoderFixture.getEncoderModelWithOutputChannel(),
        EncoderModel.class);

    // Go to List of Senders
    driver.get("http://localhost:3000/Devices");

    // Check for encoder
    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table

    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("tr")));
    }

    List<WebElement> devicesRows =
        encodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        devicesRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(EncoderFixture.getEncoderModel().getDevice().getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
  @Order(3)
  void testAddDecoder() {
    // mock receiver self-registration
    testRestTemplate.postForObject(
        "http://localhost:8080/device", DeviceFixture.getDeviceModel(), DeviceModel.class);
    testRestTemplate.postForObject(
        "http://localhost:8080/decoder",
        DecoderFixture.getDecoderModelWithInputChannel(),
        DecoderModel.class);

    // Go to List of Receivers
    driver.get("http://localhost:3000/Devices");
    driver.findElement(By.xpath("//button[@id='vertical-tab-1']/span")).click();

    // Check for decoder
    WebElement decodersTable = driver.findElement(By.tagName("table")); // find encoders table

    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("tr")));
    }

    List<WebElement> devicesRows =
        decodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        devicesRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(DecoderFixture.getDecoderModel().getDevice().getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
  @Order(4)
  void testCreateStream() {
    driver.get("http://localhost:3000/Streams/New");
    {
      WebDriverWait wait = new WebDriverWait(driver, 100);
      wait.until(
          ExpectedConditions.elementToBeClickable(
              By.cssSelector("#SenderTable .MuiList-root .MuiSvgIcon-root")));
    }
    driver.findElement(By.cssSelector("#SenderTable .MuiList-root .MuiSvgIcon-root")).click();
    {
      WebElement element;
      WebDriverWait wait = new WebDriverWait(driver, 100);
      element =
          wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".MuiInput-input")));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element;
      WebDriverWait wait = new WebDriverWait(driver, 100);
      element =
          wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".MuiMenuItem-root")));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector("body")).click();
    driver.findElement(By.cssSelector(".MuiMenuItem-root")).click();
    driver.findElement(By.cssSelector("#ReceiverTable .MuiList-root .MuiSvgIcon-root")).click();
    {
      WebElement element;
      WebDriverWait wait = new WebDriverWait(driver, 100);
      element =
          wait.until(
              ExpectedConditions.elementToBeClickable(
                  By.xpath(
                      "//div[@id='ReceiverTable']/div[3]/ul/div[2]/div/div/div/li/div[2]/div")));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).clickAndHold().perform();
    }
    {
      WebElement element;
      WebDriverWait wait = new WebDriverWait(driver, 100);
      element =
          wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".MuiMenuItem-root")));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).release().perform();
    }
    driver.findElement(By.cssSelector("body")).click();
    driver.findElement(By.cssSelector(".MuiMenuItem-root")).click();
    driver.findElement(By.cssSelector(".buttonText")).click();

    driver.get("http://localhost:3000/Streams");

    // Check for stream creation
    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("table")));
    }

    WebElement streamsTable = driver.findElement(By.tagName("table")); // find streams table

    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("td")));
    }

    List<WebElement> devicesRows =
        streamsTable.findElements(By.tagName("td")); // find all td elements inside found table
    boolean assertValue = devicesRows.stream().anyMatch(data -> data.getText().contains("Online"));

    assertTrue(assertValue);
  }

  @Test
  @Order(5)
  void testDeleteStream() {
    driver.get("http://localhost:3000/Streams");

    driver.findElement(By.cssSelector(".MuiTableRow-root:nth-child(1) a path")).click();
    driver.findElement(By.cssSelector(".MuiButton-label")).click();
    driver.findElement(By.cssSelector(".MuiButton-textSecondary > .MuiButton-label")).click();

    driver.get("http://localhost:3000/Streams");

    // Check for stream deletion
    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("table")));
    }

    WebElement streamsTable = driver.findElement(By.tagName("table")); // find streams table
    List<WebElement> devicesRows =
        streamsTable.findElements(By.tagName("td")); // find all td elements inside found table
    boolean assertValue = devicesRows.stream().anyMatch(data -> data.getText().contains("Online"));

    assertFalse(assertValue);
  }

  @Test
  @Order(6)
  void testRenameDevice() {
    String rename = "Renamed Device";

    // Go to List of Senders
    driver.get("http://localhost:3000/Devices");

    // View Sender Device Details
    driver.findElement(By.cssSelector(".MuiIconButton-sizeSmall path")).click();
    driver.findElement(By.linkText("View Details")).click();
    {
      WebElement element = driver.findElement(By.cssSelector("#editBtn .MuiSvgIcon-root"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }

    // Rename Sender Device
    driver.findElement(By.cssSelector("#editBtn .MuiSvgIcon-root")).click();
    driver.findElement(By.id("deviceName")).click();
    driver.findElement(By.id("deviceName")).sendKeys(rename);
    driver.findElement(By.cssSelector("#confirmEditBtn path")).click();

    // Go to List of Senders
    driver.get("http://localhost:3000/Devices");

    // Check for renamed Sender
    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table

    {
      WebDriverWait wait = new WebDriverWait(driver, 5);
      wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("tr")));
    }

    List<WebElement> devicesRows =
        encodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue = devicesRows.stream().anyMatch(row -> row.getText().contains(rename));

    assertTrue(assertValue);
  }
}
