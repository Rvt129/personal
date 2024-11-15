package money.paypal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
public class PaypalApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaypalApplication.class, args);
    }

}
