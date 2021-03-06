package system_tests;

import features.AuthorizedTestRestTemplate;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.beanpod.switchboard.config.SecurityProperties;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.openapitools.model.EncoderModel;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class HttpHandler {

  private final TestRestTemplate testRestTemplate;

  public Response postRequest(String endPoint, String json) throws IOException {
    testRestTemplate.postForObject(endPoint, EncoderFixture.getEncoderModel(), EncoderModel.class);
    OkHttpClient client = new OkHttpClient().newBuilder().build();
    MediaType mediaType = MediaType.parse("application/json");
    RequestBody body = RequestBody.create(mediaType, json);
    Request request =
        new Request.Builder()
            .url(endPoint)
            .method("POST", body)
            .addHeader("Content-Type", "application/json")
            .build();

    return client.newCall(request).execute();
  }
}
