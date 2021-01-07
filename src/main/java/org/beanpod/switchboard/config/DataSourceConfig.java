package org.beanpod.switchboard.config;

import java.net.URI;
import java.net.URISyntaxException;
import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class DataSourceConfig {

  @Bean(name = "h2DataSource")
  @Profile("test")
  public DataSource h2DataSource() {
    DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.driverClassName("org.h2.Driver");
    dataSourceBuilder.url("jdbc:h2:mem:test");
    dataSourceBuilder.username("sa");
    dataSourceBuilder.password("");

    return dataSourceBuilder.build();
  }

  @Bean(name = "mySqlDevDataSource")
  @Profile("development")
  public DataSource mySqlDevDataSource() {
    DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
    //TODO if applicable, edit credentials (CAUTION: do not push changes to version control)
    dataSourceBuilder.url(
        "jdbc:mysql://localhost:3306/"
            + "switchboard?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC");
    dataSourceBuilder.username("root");
    dataSourceBuilder.password("root");

    return dataSourceBuilder.build();
  }

  @Bean(name = "mySqlProdDataSource")
  @Profile("production")
  public DataSource mySqlProdDataSource() throws URISyntaxException {
    URI dbUri = new URI(System.getenv("CLEARDB_DATABASE_URL"));

    String username = dbUri.getUserInfo().split(":")[0];
    String password = dbUri.getUserInfo().split(":")[1];
    String dbUrl = "jdbc:mysql://" + dbUri.getHost() + dbUri.getPath();

    DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.url(dbUrl);
    dataSourceBuilder.username(username);
    dataSourceBuilder.password(password);

    return dataSourceBuilder.build();
  }
}
