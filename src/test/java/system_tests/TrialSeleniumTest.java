package system_tests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static system_tests.HttpHandler.postRequest;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class TrialSeleniumTest {
    private static WebDriver driver;

    @BeforeAll
    static void setUp(){

        System.setProperty("webdriver.chrome.driver","src\\test\\java\\system_tests\\chromedriver.exe");
        driver = new ChromeDriver();

        //create a test device
        HashMap<String, String> deviceParam = new HashMap();
        deviceParam.put("serialNumber","10");
        deviceParam.put("displayName","Sender Test10");
        deviceParam.put("status","Running");
        deviceParam.put("ipAddress","212.150.5.74");
        postRequest("http://localhost:8080/device",deviceParam);

        //create a test decoder
        HashMap<String, String> encoderParam = new HashMap();
        encoderParam.put("serialNumber","10");
        encoderParam.put("lastCommunication","2020-11-28 09:40:00");
        postRequest("http://localhost:8080/encoder",encoderParam);
    }

    @Test
    void testAddDecoder(){
        driver.get("http://localhost:3000/Devices");
        driver.manage().window().setSize(new Dimension(782, 818));
        
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);

        List<WebElement> devicesRows = driver.findElements(By.className("singleDeviceRow"));
        boolean assertValue = false;
        for(WebElement element : devicesRows){
           if(element.getText().contains("Sender Test10")) {
               assertValue = true;
               break;
           }
        }

        assertTrue(assertValue);
    }

    @AfterEach
    void tearDown(){
        driver.quit();
    }
}