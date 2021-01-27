package system_tests;

import java.io.IOException;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class HttpHandler {

  public static Response postRequest(String endPoint, String json)
      throws IOException {
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
