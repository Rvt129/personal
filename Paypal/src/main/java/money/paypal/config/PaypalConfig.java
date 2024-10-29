package money.paypal.config;

import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@ConfigurationProperties(prefix = "paypal")
@Configuration
public class PaypalConfig {

    @Value("ARXXZnqkE9Voub64_6lqDLeBd2qK-gE7zJVx6KMKYO_KiMAgZrM3v6jsnMpTShW-0DADs4CnElVuAdJH")
    private String clientId;
    @Value("EBeJvZBxlGcoyouRtl3q0pEpKiCBoxV2jPETJgD8PwdIOCv4TkEU2N_RB3KA3THCnIou4q5kOh4rPk9x")
    private String clientSecret;
    @Value("sandbox")
    private String mode;

    @Bean
    public Map<String, String> paypalSdkConfig() {

        Map<String, String> sdkConfig = new HashMap<>();
        sdkConfig.put("mode", mode);
        return sdkConfig;
    }

    @Bean
    public OAuthTokenCredential authTokenCredential() {
        return new OAuthTokenCredential(clientId, clientSecret, paypalSdkConfig());
    }

    @Bean
    public APIContext apiContext() throws PayPalRESTException {
        APIContext apiContext = new APIContext(authTokenCredential().getAccessToken());
        apiContext.setConfigurationMap(

                paypalSdkConfig());
        return apiContext;
    }

}