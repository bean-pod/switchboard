package system_tests;

import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static system_tests.HttpHandler.postRequest;

public class TrialSeleniumTest {
  private static WebDriver driver;
  private static DeviceEntity deviceEntity;

  @BeforeAll
  static void setUp() {
    // TODO set it up for mac/linux:
    // https://stackoverflow.com/questions/228477/how-do-i-programmatically-determine-operating-system-in-java
    System.setProperty(
        "webdriver.chrome.driver", "src\\test\\java\\system_tests\\chromedriver.exe");
    driver = new ChromeDriver();

    // create a test device
    deviceEntity = DeviceFixture.getDevice1();
    HashMap<String, String> deviceParam = new HashMap<>();
    deviceParam.put("serialNumber", deviceEntity.getSerialNumber());
    deviceParam.put("displayName", deviceEntity.getDisplayName());
    deviceParam.put("status", deviceEntity.getStatus());
    deviceParam.put("privateIpAddress", deviceEntity.getPrivateIpAddress());
    deviceParam.put("publicIpAddress", deviceEntity.getPublicIpAddress());
    postRequest("http://localhost:8080/device", deviceParam);

    // create a test encoder
    HashMap<String, String> encoderParam = new HashMap<>();
    encoderParam.put("serialNumber", deviceEntity.getSerialNumber());
    encoderParam.put("lastCommunication", "2020-11-28 09:40:00");
    postRequest("http://localhost:8080/encoder", encoderParam);
  }

  @Test
  void testAddDecoder() {
    driver.get("http://localhost:3000/Devices");
    driver.manage().window().setSize(new Dimension(782, 818));

    driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);

    WebElement encodersTable = driver.findElement(By.tagName("table")); // find encoders table
    List<WebElement> devicesRows =
        encodersTable.findElements(By.tagName("tr")); // find all tr elements inside found table

    boolean assertValue =
        devicesRows.stream().anyMatch(row -> row.getText().contains(deviceEntity.getDisplayName()));

    assertTrue(assertValue);
  }

  @AfterEach
  void tearDown() {
    driver.quit();
  }
}
