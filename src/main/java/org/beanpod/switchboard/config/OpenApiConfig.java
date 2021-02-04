package org.beanpod.switchboard.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;

public class OpenApiConfig {

  @Bean
  public OpenAPI springShopOpenApi() {
    return new OpenAPI()
        .info(
            new Info()
                .title("SwitchBoard API")
                .description("SwitchBoard Application")
                .version("v0.0.1")
                .license(new License().name("Apache 2.0").url("http://springdoc.org")))
        .externalDocs(
            new ExternalDocumentation()
                .description("Switchboard Wiki Documentation")
                .url("https://switchboard.wiki.github.org/docs"));
  }
}
