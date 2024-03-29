package pre_Project.server.global.auth.handler;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import pre_Project.server.global.response.ErrorResponse;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler { // 인증 실패시 처리용 클래스

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        log.error(" Authentication failed: {}", exception.getMessage());
        sendErrorResponse(response, exception);
    }

    private void sendErrorResponse(HttpServletResponse response, Exception exception) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse;
        if(exception.getMessage().equals("Member not found")) {
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED,"INVALID_EMAIL");
        }
        else {
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED,"INVALID_PASSWORD");
        }
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
