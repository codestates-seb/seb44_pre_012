package pre_Project.server.domain.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.global.audit.Auditable;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionId;

    @Column(nullable = false)
    private String questionTitle;

    @Column(nullable = false)
    private String questionContent;

    @Column(nullable = false)
    private int view;

}
