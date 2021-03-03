package system_tests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static system_tests.HttpHandler.postRequest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;
import net.lightbody.bmp.BrowserMobProxy;
import net.lightbody.bmp.BrowserMobProxyServer;
import net.lightbody.bmp.client.ClientUtil;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Proxy;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class SystemTests {

  private static WebDriver driver;
  private static String testSenderDeviceParams;
  private static String testSenderEncoderParams;
  private static String testReceiverDeviceParams;
  private static String testReceiverDecoderParams;

  @BeforeAll
  static void setUp() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    // create a test sender
    EncoderEntity testSender = EncoderFixture.getEncoderEntity1();
    testSenderDeviceParams = objectMapper.writeValueAsString(testSender.getDevice());
    testSenderEncoderParams = objectMapper.writeValueAsString(testSender);

    // create a test receiver
    DecoderEntity testReceiver = DecoderFixture.getDecoderEntity2();
    testReceiverDeviceParams = objectMapper.writeValueAsString(testReceiver.getDevice());
    testReceiverDecoderParams = objectMapper.writeValueAsString(testReceiver);

    // Set up proxy
    BrowserMobProxy proxy = new BrowserMobProxyServer();
    proxy.start(0);
    Proxy seleniumProxy = ClientUtil.createSeleniumProxy(proxy);

    // Add Authorization header to each request
    proxy.addRequestFilter(
        (request, contents, messageInfo) -> {
          request
              .headers()
              .add(
                  "Authorization",
                  "Bearer"
                      + " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJVU0VSIiwiZXhwIjoxNjE0ODU0MTQ1fQ.BIUPn9As6lfvN4JGEFBrJLw6DzS3e4bpUXmQ979e4XGO5sYpC3P-CyF_APHl6sSPWSnz4cLcsgD0g6SB_LhLhA");
          return null;
        });

    // Set up Selenium Chrome Driver
    ChromeOptions chromeOptions = new ChromeOptions();
    String proxyOption = "--proxy-server=" + seleniumProxy.getHttpProxy();
    chromeOptions.addArguments(proxyOption);
    if (System.getProperty("os.name").toLowerCase().contains("windows")) {
      System.setProperty(
          "webdriver.chrome.driver", "src\\test\\java\\system_tests\\chromedriver.exe");
    } else {
      System.setProperty("webdriver.chrome.driver", "src/test/java/system_tests/chromedriver");
    }
    driver = new ChromeDriver(chromeOptions);
    driver.get("http://localhost:3000/Login");
    driver.manage().window().setSize(new Dimension(1280, 1024));
    driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
    driver.findElement(By.id("username")).sendKeys("admin");
    driver.findElement(By.id("password")).sendKeys("admin");
    driver.findElement(By.cssSelector(".MuiButton-root")).click();
  }

  @AfterAll
  static void tearDown() {
    driver.quit();
  }

  @Test
  @Order(1)
  void testAddEncoder() throws IOException {
    // Mock sender self-registration
    postRequest("http://localhost:8080/device", testSenderDeviceParams);
    postRequest("http://localhost:8080/encoder", testSenderEncoderParams);

    // Go to List of Senders
    driver.get("http://localhost:3000/Devices");

    // Check for encoder
    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table
    List<WebElement> devicesRows =
        encodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        devicesRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(EncoderFixture.getEncoderEntity1().getDevice().getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
  @Order(2)
  void testAddDecoder() throws IOException {
    // mock receiver self-registration
    postRequest("http://localhost:8080/device", testReceiverDeviceParams);
    postRequest("http://localhost:8080/decoder", testReceiverDecoderParams);

    // Go to List of Receivers
    driver.get("http://localhost:3000/Devices");
    driver.findElement(By.xpath("//button[@id='vertical-tab-1']/span")).click();

    // Check for decoder
    WebElement decodersTable = driver.findElement(By.tagName("table")); // find encoders table
    List<WebElement> devicesRows =
        decodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table
    boolean assertValue =
        devicesRows.stream()
            .anyMatch(
                row ->
                    row.getText()
                        .contains(DecoderFixture.getDecoderEntity2().getDevice().getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
  @Order(3)
  void testCreateStream() {
    driver.get("http://localhost:3000/Streaming");
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

    driver.navigate().refresh();

    // Check for stream creation
    WebElement streamsTable = driver.findElement(By.tagName("table")); // find streams table
    List<WebElement> devicesRows =
        streamsTable.findElements(By.tagName("td")); // find all td elements inside found table
    boolean assertValue = devicesRows.stream().anyMatch(data -> data.getText().contains("Online"));

    assertTrue(assertValue);
  }

  @Test
  @Order(4)
  void testDeleteStream() {
    driver.get("http://localhost:3000/Streaming");
    driver
        .findElement(
            By.cssSelector(
                ".MuiTableCell-root > .MuiButtonBase-root > .MuiIconButton-label >"
                    + " .MuiSvgIcon-root"))
        .click();
    driver.findElement(By.cssSelector(".MuiButton-textSecondary > .MuiButton-label")).click();

    // Check for stream deletion
    driver.navigate().refresh();
    WebElement streamsTable = driver.findElement(By.tagName("table")); // find streams table
    List<WebElement> devicesRows =
        streamsTable.findElements(By.tagName("td")); // find all td elements inside found table
    boolean assertValue = devicesRows.stream().anyMatch(data -> data.getText().contains("Online"));

    assertFalse(assertValue);
  }
}
