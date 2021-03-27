package org.beanpod.switchboard.util;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JsonUtilTest {

  private JsonUtil jsonUtil;


  @Test
  final void isJSONValidTest(){
    boolean result = jsonUtil.isJSONValid("hello");
    boolean result1 = jsonUtil.isJSONValid("");
    assertEquals(false, result);
    assertEquals(true, result1);
  }

}
