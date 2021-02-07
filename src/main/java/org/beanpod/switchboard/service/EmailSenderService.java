package org.beanpod.switchboard.service;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailSenderService {

  private JavaMailSender javaMailSender;

  @Async
  public void sendEmail(SimpleMailMessage email) {
    javaMailSender.send(email);
  }
}