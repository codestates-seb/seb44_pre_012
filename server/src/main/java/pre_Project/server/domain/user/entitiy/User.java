package pre_Project.server.domain.user.entitiy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.global.audit.Auditable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "USERS")
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String userName;
    @Column(nullable = false)
    private String password;
    @Builder.Default
    @Enumerated(value = EnumType.STRING) //회원 탈퇴 시 userstatus = USER_QUIT
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;
    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Question> questionList = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER) // 사용자 권한 등록을 위한 테이블
    private List<String> roles = new ArrayList<>();

    public enum UserStatus {
        USER_ACTIVE("활동중"),
        USER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

}
