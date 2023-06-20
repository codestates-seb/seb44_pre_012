package pre_Project.server.domain.user.entitiy;

import lombok.Getter;
import lombok.Setter;
import pre_Project.server.global.audit.Auditable;

import javax.persistence.*;

@Getter
@Setter
@Entity
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
    private String passWord;
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

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
