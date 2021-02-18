package features;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.config.SecurityProperties;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
@Configuration
public class AuthorizedTestRestTemplate {
    private final String baseUrl = "http://127.0.0.1:8080";
    private final SecurityProperties securityProperties;
    private String token = null;

    @Bean
    public RestTemplateBuilder authorizedTestRestTemplate(){
        return new RestTemplateBuilder().additionalInterceptors(
                (request, body, execution) -> {
                    if (token == null){
                        getNewToken();
                    }

                    request.getHeaders().add(HttpHeaders.AUTHORIZATION, token);
                    return execution.execute(request, body);
                }
        );
    }

    private void getNewToken(){
        String url = baseUrl+securityProperties.getAuthenticationUrl();
        ResponseEntity<String> response = new TestRestTemplate()
                .withBasicAuth(securityProperties.getSuperuserUsername(), securityProperties.getSuperuserPassword())
                .getForEntity(url, String.class);
        token = response.getHeaders().get("Authorization").get(0);
    }
}
