package org.beanpod.switchboard.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException e)
      throws IOException, ServletException {

    ObjectMapper mapper = new ObjectMapper();

    ObjectNode objectNode = mapper.createObjectNode();
    objectNode.put("timestamp", System.currentTimeMillis());
    objectNode.put("status", 401);
    objectNode.put("message", "Unauthorized");

    String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(objectNode);

    res.setContentType("application/json;charset=UTF-8");
    res.setStatus(401);

    PrintWriter printWriter = res.getWriter();
    printWriter.print(json);
    printWriter.flush();
  }
}
