package org.beanpod.switchboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SwitchboardApplication {

  public static void main(String[] args) {
    System.out.println("Babe are you ok? you've barely touched your special edition Sonic curry.");
    SpringApplication.run(SwitchboardApplication.class, args);
  }
}
