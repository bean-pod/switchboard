package system_tests;

import okhttp3.*;

import java.io.IOException;

public class HttpHandler {

  public static Response postRequest(String endPoint, String json) throws IOException {
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
