package system_tests;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import features.AuthorizedTestRestTemplate;
import features.SpringIntegrationTest;
import java.beans.Encoder;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.beanpod.switchboard.SwitchboardApplication;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Import;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(
    classes = SwitchboardApplication.class,
    webEnvironment= WebEnvironment.DEFINED_PORT
)
@Import(AuthorizedTestRestTemplate.class)
@TestInstance(Lifecycle.PER_CLASS)
//TODO make sure those annotationsa are necessary
@ComponentScan("system_tests")
@ComponentScan("org.beanpod.switchboard")
public class SystemTests{

  @Autowired
  private TestRestTemplate testRestTemplate;

  private WebDriver driver;
  private String testSenderDeviceParams;
  private String testSenderEncoderParams;
  private String testReceiverDeviceParams;
  private String testReceiverDecoderParams;


  @BeforeAll
  void setUp() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    //TODO remote these if not needed anymore
    // create a test sender
    EncoderEntity testSender = EncoderFixture.getEncoderEntity1();
    testSenderDeviceParams = objectMapper.writeValueAsString(testSender.getDevice());
    testSenderEncoderParams = objectMapper.writeValueAsString(testSender);

    // create a test receiver
    DecoderEntity testReceiver = DecoderFixture.getDecoderEntity2();
    testReceiverDeviceParams = objectMapper.writeValueAsString(testReceiver.getDevice());
    testReceiverDecoderParams = objectMapper.writeValueAsString(testReceiver);

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
    login();
  }

  @AfterAll
  void tearDown() {
    driver.quit();
  }

  @Test
  @Order(1)
  void testAddEncoder() throws IOException {
    // Mock sender self-registration

    testRestTemplate.postForObject("http://localhost:8080/device", DeviceFixture.getDeviceModel(),
        DeviceModel.class);
    testRestTemplate.postForObject("http://localhost:8080/encoder", EncoderFixture.getEncoderModelWithOutputChannel(),
        EncoderModel.class);

    // Go to List of Senders
    driver.get("http://localhost:3000/Devices");

    // Check for encoder
    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table

    WebDriverWait wait = new WebDriverWait(driver, 5);
    wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("tr")));

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
  @Order(2)
  void testAddDecoder() throws IOException {
    // mock receiver self-registration
    testRestTemplate.postForObject("http://localhost:8080/device", DeviceFixture.getDeviceModel(),
        DeviceModel.class);
    testRestTemplate.postForObject("http://localhost:8080/decoder", DecoderFixture.getDecoderModelWithInputChannel(),
        DecoderModel.class);

    // Go to List of Receivers
    driver.get("http://localhost:3000/Devices");
    driver.findElement(By.xpath("//button[@id='vertical-tab-1']/span")).click();

    // Check for decoder
    WebElement decodersTable = driver.findElement(By.tagName("table")); // find encoders table

    WebDriverWait wait = new WebDriverWait(driver, 5);
    wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("tr")));

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

    WebDriverWait wait = new WebDriverWait(driver, 5);
    wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("td")));

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

    WebDriverWait wait = new WebDriverWait(driver, 5);
    wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("td")));

    List<WebElement> devicesRows =
        streamsTable.findElements(By.tagName("td")); // find all td elements inside found table
    boolean assertValue = devicesRows.stream().anyMatch(data -> data.getText().contains("Online"));

    assertFalse(assertValue);
  }


  @SneakyThrows
  private void login() {
    driver.get("http://localhost:3000/login");
    driver.findElement(By.id("username")).click();
    driver.findElement(By.id("username")).clear();
    driver.findElement(By.id("username")).sendKeys("test_username");
    driver.findElement(By.id("password")).clear();
    driver.findElement(By.id("password")).sendKeys("test_password");
    driver.findElement(By.xpath("//div[@id='root']/div[2]/main/div/form/button/span")).click();
  }
}
