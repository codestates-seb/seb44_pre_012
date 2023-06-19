package pre_Project.server.global.auth.dto;

import lombok.Getter;

@Getter
public class LoginDto { //로그인 요청 Json 데이터 역직렬화 용 클래스
    private String email;
    private String password;
}
