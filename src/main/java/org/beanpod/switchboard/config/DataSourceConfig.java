package org.beanpod.switchboard.config;

import java.net.URI;
import java.net.URISyntaxException;
import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

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
  public DataSource mySqlDevDataSource(Environment env) {
    String username =
        env.getProperty("spring.datasource.username") == null
            ? "root"
            : env.getProperty("spring.datasource.username");
    String password =
        env.getProperty("spring.datasource.password") == null
            ? "root"
            : env.getProperty("spring.datasource.password");
    String dbUrl =
        env.getProperty("spring.datasource.url") == null
            ? "jdbc:mysql://localhost:3306/"
                + "switchboard?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC"
            : env.getProperty("spring.datasource.url");

    DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
    dataSourceBuilder.url(dbUrl);
    dataSourceBuilder.username(username);
    dataSourceBuilder.password(password);

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
