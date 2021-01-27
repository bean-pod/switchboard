package system_tests;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static system_tests.HttpHandler.postRequest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.fixture.DecoderFixture;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TrialSeleniumTest {

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

    // Set up Selenium Chrome Driver
    // TODO set it up for mac/linux:
    // https://stackoverflow.com/questions/228477/how-do-i-programmatically-determine-operating-system-in-java
    System.setProperty(
        "webdriver.chrome.driver", "src/test/java/system_tests/chromedriver");
    driver = new ChromeDriver();
    driver.manage().window().setSize(new Dimension(1280, 1024));
    driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
  }

  @Test
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
        devicesRows.stream().anyMatch(row -> row.getText().contains(EncoderFixture.getEncoderEntity1().getDevice().getDisplayName()));

    assertTrue(assertValue);
  }

  @Test
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
        devicesRows.stream().anyMatch(row -> row.getText().contains(DecoderFixture.getDecoderEntity2().getDevice().getDisplayName()));

    assertTrue(assertValue);
  }

  // TODO
  @Test
  void testCreateStream() {

  }

  // TODO
  @Test
  void testViewStream() {

  }

  // TODO
  @Test
  void testDeleteStream() {

  }

  @AfterAll
  static void tearDown() {
    driver.quit();
  }
}
