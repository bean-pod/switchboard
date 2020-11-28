package system_tests;

import okhttp3.*;

import java.io.IOException;
import java.util.List;

public class HttpHandler {
    public static void main(String[] args) throws IOException {

        System.out.println();
    }
     public static Response postRequest(String endPoint) throws IOException {
         OkHttpClient client = new OkHttpClient().newBuilder()
                 .build();
         MediaType mediaType = MediaType.parse("application/json");
         RequestBody body = RequestBody.create(mediaType, "    {\r\n        \"serialNumber\": 3,\r\n        \"displayName\": \"Device3\",\r\n        \"status\": \"Running\",\r\n        \"ipAddress\":\"212.150.5.74\"\r\n    }");
         Request request = new Request.Builder()
                 .url(endPoint)
                 .method("POST", body)
                 .addHeader("Content-Type", "application/json")
                 .build();
         Response response = client.newCall(request).execute();

         return response;
     }
}
