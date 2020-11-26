package system_tests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class TrialSeleniumTest {
    private static WebDriver driver;

    @BeforeAll
    static void setUp(){
        System.setProperty("webdriver.chrome.driver","src\\test\\java\\system_tests\\chromedriver.exe");
        driver = new ChromeDriver();
    }

    @Test
    void testAddDecoder(){
        driver.get("http://localhost:3000/Devices");
        driver.manage().window().setSize(new Dimension(782, 818));

        //populate Name, Serial Name and IP Address fields
        driver.findElement(By.id("nameSearch")).sendKeys("Sender Test10");
        driver.findElement(By.id("serialSearch")).sendKeys("1:10:111:999");
        driver.findElement(By.id("ipSearch")).sendKeys("123:456");

        //select Online status
        {
            WebElement element = driver.findElement(By.id("statusSearch"));
            Actions builder = new Actions(driver);
            builder.moveToElement(element).clickAndHold().perform();
        }
        {
            driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
            WebElement element = driver.findElement(By.cssSelector("#menu- > div:nth-child(1)"));
            Actions builder = new Actions(driver);
            builder.moveToElement(element).release().perform();
        }
        driver.findElement(By.cssSelector("body")).click();
        driver.findElement(By.cssSelector(".MuiListItem-dense:nth-child(1)")).click();

        driver.findElement(By.id("DeviceListAddDevBtn")).click();

        //Check if the device was added
        driver.navigate().refresh();
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