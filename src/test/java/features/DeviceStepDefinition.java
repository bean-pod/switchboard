package features;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.fixture.DeviceFixture;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@RequiredArgsConstructor
@Import(AuthorizedTestRestTemplate.class)
public class DeviceStepDefinition extends SpringIntegrationTest {
  private final String baseUrl = "http://localhost:8080/device";
  private final TestRestTemplate testRestTemplate;
  private ResponseEntity responseEntity;
  private ResponseEntity<List<DeviceDto>> responseEntityDtos;
  private URI uri;

  @SneakyThrows
  @Given("I want to get all devices")
  @Given("I want to create a device")
  @Given("I want to update a device")
  public void i_want_to_make_a_device_base_request() {
    uri = new URI(baseUrl);
  }

  @SneakyThrows
  @Given("I want to delete the device with serialNumber {string}")
  @Given("I want to get the device with serialNumber {string}")
  public void i_want_to_make_a_device_serialNumber_request(String serialNumber) {
    uri = new URI(baseUrl + "/" + serialNumber);
  }

  @When("I get a device")
  public void i_get_a_device() {
    responseEntity = testRestTemplate.getForEntity(uri, DeviceDto.class);
  }

  @When("I get all devices")
  public void i_get_all_devices() {
    responseEntityDtos =
        testRestTemplate.exchange(
            uri, HttpMethod.GET, null, new ParameterizedTypeReference<List<DeviceDto>>() {});
  }

  @When("I create a device")
  public void i_create_a_device() {
    responseEntity =
        testRestTemplate.postForEntity(uri, DeviceFixture.getDeviceDto1(), DeviceDto.class);
  }

  @When("I delete a device")
  public void i_delete_a_device() {
    testRestTemplate.delete(uri);
  }

  @When("I update a device")
  public void i_update_a_device() {
    DeviceDto deviceDto = DeviceFixture.getDeviceDto1();
    deviceDto.setDisplayName("New display name");
    HttpEntity httpEntity = new HttpEntity(deviceDto);
    responseEntity = testRestTemplate.exchange(uri, HttpMethod.PUT, httpEntity, DeviceDto.class);
  }

  @Then("I should get a response with status {int}")
  public void i_should_get_a_response_with_status(Integer code) {
    assertEquals(
        code,
        responseEntity != null
            ? responseEntity.getStatusCodeValue()
            : responseEntityDtos.getStatusCodeValue());
  }

  @Then("I should get a response with body")
  public void i_should_get_a_response_with_body() {
    assertEquals(DeviceFixture.getDeviceDto1(), responseEntity.getBody());
  }

  @Then("I should get an updated response with body")
  public void i_should_get_an_update_response_with_body() {
    DeviceDto deviceDto = DeviceFixture.getDeviceDto1();
    deviceDto.setDisplayName("New display name");
    assertEquals(deviceDto, responseEntity.getBody());
  }

  @SneakyThrows
  @Then("I should get a response with body list")
  public void i_should_get_a_response_with_body_list() {
    assertIterableEquals(DeviceFixture.getDeviceDtos(), responseEntityDtos.getBody());
  }
}
