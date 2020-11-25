package system_tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class TrialSeleniumTest {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver","src\\test\\java\\system_tests\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        String baseUrl = "http://google.com";
        driver.get(baseUrl);
    }
}
