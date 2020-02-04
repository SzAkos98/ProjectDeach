package hu.inf.unideb.projectdeach;

import hu.inf.unideb.projectdeach.utils.PropertiesUtils;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.io.IOException;

@SpringBootApplication
@EntityScan("hu.inf.unideb.projectdeach.model")
public class ProjectDeachApplication {

    public static void main (String[] args) {
        SpringApplication.run(ProjectDeachApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public DataSource dataSource() throws IOException {
        return DataSourceBuilder.create()
                .driverClassName(PropertiesUtils.getProperty("hibernate.connection.driver_class"))
                .username(PropertiesUtils.getProperty("hibernate.connection.username"))
                .password(PropertiesUtils.getProperty("hibernate.connection.password"))
                .url(PropertiesUtils.getProperty("hibernate.connection.url")).build();
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter bean = new HibernateJpaVendorAdapter();
        bean.setDatabase(Database.H2);
        bean.setGenerateDdl(true);
        bean.setShowSql(true);
        return bean;
    }

    @Bean
    public JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
