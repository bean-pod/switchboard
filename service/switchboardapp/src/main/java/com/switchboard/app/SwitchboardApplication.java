package com.switchboard.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SwitchboardApplication {

    public static void main(String[] args) {
        System.out.println("test github actions");
        SpringApplication.run(SwitchboardApplication.class, args);
    }

}
