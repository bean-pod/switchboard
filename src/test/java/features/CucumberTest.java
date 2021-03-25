package features;

import io.cucumber.junit.platform.engine.Cucumber;
import org.beanpod.switchboard.SwitchboardApplication;
import org.springframework.boot.test.context.SpringBootTest;

@Cucumber
@SpringBootTest(
    classes = {SwitchboardApplication.class},
    webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class CucumberTest {}
