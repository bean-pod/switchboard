package system_tests;

import okhttp3.*;
import org.apache.http.NameValuePair;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicNameValuePair;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HttpHandler {
    public static void main(String[] args) throws IOException {
        HashMap<String, String> params = new HashMap();
        params.put("serialNumber","3");
        params.put("displayName","Device3");
        params.put("status","Running");
        params.put("ipAddress","212.150.5.74");

        for(Map.Entry<String, String> entry : params.entrySet()){
            System.out.println("key: "+entry.getKey()+"\tvalue: "+isInteger(entry.getValue()));
//            System.out.println(entry.getValue());
        }
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

     //checks if a value is an integer
     private boolean isInteger(String value){
        try{
            Integer.parseInt(value);
            return true; //value is int
        }catch (Exception e){
            return false; //value isn't int
        }
     }
}
