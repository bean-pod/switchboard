package org.beanpod.switchboard.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class JsonUtilTest {

  private JsonUtil jsonUtil;

  @Test
  final void isJSONValidTest() {
    boolean result = jsonUtil.isJsonValid("hello");
    boolean result1 = jsonUtil.isJsonValid("");
    assertEquals(false, result);
    assertEquals(true, result1);
  }
}
