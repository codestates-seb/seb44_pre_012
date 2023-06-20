package pre_Project.server.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import pre_Project.server.domain.user.repository.UserRepository;
import pre_Project.server.global.auth.filter.JwtAuthenticationFiler;
import pre_Project.server.global.auth.filter.JwtVerificationFiler;
import pre_Project.server.global.auth.handler.UserAccessDeniedHandler;
import pre_Project.server.global.auth.handler.UserAuthenticationEntryPoint;
import pre_Project.server.global.auth.handler.UserAuthenticationFailureHandler;
import pre_Project.server.global.auth.handler.UserAuthenticationSuccessHandler;
import pre_Project.server.global.auth.jwt.JwtTokenizer;
import pre_Project.server.global.auth.utills.CustomAuthorityUtills;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration { // 보안 설정
    private final JwtTokenizer jwtTokenizer;
    private final UserRepository userRepository;
    private final CustomAuthorityUtills authorityUtills;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, UserRepository userRepository, CustomAuthorityUtills authorityUtills) {
        this.jwtTokenizer = jwtTokenizer;
        this.userRepository = userRepository;
        this.authorityUtills = authorityUtills;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { // 기본 구성 설정
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() { // cors 설정
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source =  new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFiler jwtAuthenticationFiler = new JwtAuthenticationFiler(authenticationManager, jwtTokenizer, userRepository);
            jwtAuthenticationFiler.setFilterProcessesUrl("/users/login");
            jwtAuthenticationFiler.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFiler.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFiler jwtVerificationFiler = new JwtVerificationFiler(jwtTokenizer, authorityUtills);

            builder.addFilter(jwtAuthenticationFiler)
                    .addFilterAfter(jwtVerificationFiler, JwtAuthenticationFiler.class);
        }
    }
}
