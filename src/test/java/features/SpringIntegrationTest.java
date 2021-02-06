package features;

import io.cucumber.spring.CucumberContextConfiguration;
import org.beanpod.switchboard.SwitchboardApplication;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(
    classes = {SwitchboardApplication.class},
    webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class SpringIntegrationTest {}
