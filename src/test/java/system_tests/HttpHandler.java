package system_tests;

import okhttp3.*;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

public class HttpHandler {
  public static Response postRequest(String endPoint, HashMap<String, String> bodyParam) {
    OkHttpClient client = new OkHttpClient().newBuilder().build();
    MediaType mediaType = MediaType.parse("application/json");
    RequestBody body = RequestBody.create(mediaType, new JSONObject(bodyParam).toString());
    Request request =
        new Request.Builder()
            .url(endPoint)
            .method("POST", body)
            .addHeader("Content-Type", "application/json")
            .build();

    Response response;
    try {
      response = client.newCall(request).execute();
    } catch (IOException e) {
      response = null;
      System.err.println(e);
    }

    return response;
  }
}
