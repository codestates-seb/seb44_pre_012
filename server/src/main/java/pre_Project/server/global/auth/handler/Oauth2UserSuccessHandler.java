package pre_Project.server.global.auth.handler;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.domain.user.service.UserService;
import pre_Project.server.global.auth.jwt.JwtTokenizer;
import pre_Project.server.global.auth.utills.CustomAuthorityUtils;
import pre_Project.server.global.auth.utills.CustomAuthorityUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class Oauth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String name =  String.valueOf(oAuth2User.getAttributes().get("name"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = authorityUtils.createRoles(email);

        User user = saveUser(email, name);

        redirect(request, response, user, authorities);
    }

    private User saveUser(String email, String name) {
        User user = User.builder()
                        .email(email)
                        .password("")
                        .userName(name)
                        .userStatus(User.UserStatus.USER_ACTIVE)
                        .build();
        return userService.createOauth2User(user);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, User user, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(user.getEmail(), authorities);
        String refreshToken = delegateRefreshToken(user.getEmail());

        String headerValue = "Bearer "+ accessToken;
        response.setHeader("Authorization",headerValue);
        response.setHeader("Refresh",refreshToken);

        String uri = createURI(request, accessToken, refreshToken, user).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken, User user) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("userId", ""+user.getUserId());
        queryParams.add("userName", URLEncoder.encode(user.getUserName(), StandardCharsets.UTF_8));
        queryParams.add("email", ""+user.getEmail());

        String serverName = request.getServerName();
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(serverName)
                .port(5173)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
