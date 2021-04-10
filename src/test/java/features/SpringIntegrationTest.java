package features;

import io.cucumber.spring.CucumberContextConfiguration;
import org.beanpod.switchboard.SwitchboardApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@CucumberContextConfiguration
@SpringBootTest(
    classes = {SwitchboardApplication.class},
    webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@Import(AuthorizedTestRestTemplate.class)
public class SpringIntegrationTest {}
