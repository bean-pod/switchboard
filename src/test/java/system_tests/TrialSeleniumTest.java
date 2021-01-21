package system_tests;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static system_tests.HttpHandler.postRequest;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
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
  private static HashMap<String, String> testSenderDeviceParams;
  private static HashMap<String, String> testSenderEncoderParams;
  private static HashMap<String, String> testReceiverDeviceParams;
  private static HashMap<String, String> testReceiverDecoderParams;

  @BeforeAll
  static void setUp() {
    String pattern = "yyyy-MM-dd HH:mm:ss";
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

    // create a test sender
    EncoderEntity testSender = EncoderFixture.getEncoderEntity1();

    testSenderDeviceParams = new HashMap<>();
    testSenderDeviceParams.put("serialNumber", testSender.getDevice().getSerialNumber());
    testSenderDeviceParams.put("displayName", testSender.getDevice().getDisplayName());
    testSenderDeviceParams.put("status", testSender.getDevice().getStatus());
    testSenderDeviceParams.put("privateIpAddress", testSender.getDevice().getPrivateIpAddress());
    testSenderDeviceParams.put("publicIpAddress", testSender.getDevice().getPublicIpAddress());

    testSenderEncoderParams = new HashMap<>();
    testSenderEncoderParams.put("serialNumber", testSender.getSerialNumber());
    testSenderEncoderParams.put("lastCommunication", simpleDateFormat.format(testSender.getLastCommunication()));
    // TODO testSenderEncoderParams.put("output", testSender.getOutput().toString());

    // create a test receiver
    DecoderEntity testReceiver = DecoderFixture.getDecoderEntity2();

    testReceiverDeviceParams = new HashMap<>();
    testReceiverDeviceParams.put("serialNumber", testReceiver.getDevice().getSerialNumber());
    testReceiverDeviceParams.put("displayName", testReceiver.getDevice().getDisplayName());
    testReceiverDeviceParams.put("status", testReceiver.getDevice().getStatus());
    testReceiverDeviceParams.put("privateIpAddress", testReceiver.getDevice().getPrivateIpAddress());
    testReceiverDeviceParams.put("publicIpAddress", testReceiver.getDevice().getPublicIpAddress());

    testReceiverDecoderParams = new HashMap<>();
    testReceiverDecoderParams.put("serialNumber", testReceiver.getSerialNumber());
    testReceiverDecoderParams.put("lastCommunication", simpleDateFormat.format(testReceiver.getLastCommunication()));
    // TODO testReceiverDecoderParams.put("input", testReceiver.getInput().toString());

    // Set up Selenium Chrome Driver
    // TODO set it up for mac/linux:
    // https://stackoverflow.com/questions/228477/how-do-i-programmatically-determine-operating-system-in-java
    System.setProperty(
        "webdriver.chrome.driver", "src\\test\\java\\system_tests\\chromedriver.exe");
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
        devicesRows.stream().anyMatch(row -> row.getText().contains(testSenderDeviceParams.get("displayName")));

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
        devicesRows.stream().anyMatch(row -> row.getText().contains(testReceiverDeviceParams.get("displayName")));

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
