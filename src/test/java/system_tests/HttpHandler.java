package system_tests;

import okhttp3.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class HttpHandler {
  public static Response postRequest(String endPoint, HashMap<String, String> bodyParam) {
    OkHttpClient client = new OkHttpClient().newBuilder().build();
    MediaType mediaType = MediaType.parse("application/json");
    RequestBody body = RequestBody.create(mediaType, convertHashMapToString(bodyParam));
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

  // checks if a value is an integer
  private static boolean isInteger(String value) {
    try {
      Integer.parseInt(value);
      return true; // value is int
    } catch (Exception e) {
      return false; // value isn't int
    }
  }

  // converts a hashMap to a string
  private static String convertHashMapToString(HashMap<String, String> hashMap) {
    String result = "{";
    int hashMapSize = hashMap.size();

    for (Map.Entry<String, String> entry : hashMap.entrySet()) {
      hashMapSize--;
      result +=
          "\r\n\""
              + entry.getKey()
              + "\":"
              + (isInteger(entry.getValue()) ? entry.getValue() : "\"" + entry.getValue() + "\"")
              + (hashMapSize != 0 ? "," : "")
              + "\r\n";
    }

    result += "}";

    return result;
  }
}
