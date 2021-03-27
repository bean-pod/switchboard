package org.beanpod.switchboard.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

public class JsonUtil {
  private JsonUtil() {}

  public static boolean isJsonValid(String jsonInString) {
    try {
      final ObjectMapper mapper = new ObjectMapper();
      mapper.readTree(jsonInString);
      return true;
    } catch (IOException e) {
      return false;
    }
  }
}
