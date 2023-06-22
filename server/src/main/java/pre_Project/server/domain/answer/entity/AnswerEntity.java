package pre_Project.server.domain.answer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.user.entitiy.User;

import javax.persistence.*;
import java.lang.reflect.Member;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@EnableJpaAuditing
@Entity
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Setter
    @Column(length = 255, nullable = false)
    private String content;
    @Enumerated(EnumType.STRING)
    private AnswerStatus status = AnswerStatus.ANSWER_VALID;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;
    public void setMember(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    public void setQuestion(Question question) {
        this.question = question;
    }

    public enum AnswerStatus {
        ANSWER_VALID("등록됨"),
        ANSWER_DELETED("삭제됨");
        @Getter
        private String answerStatus;
        AnswerStatus(String status) {
            this.answerStatus = status;
        }
    }

    public Answer(long id, String content, AnswerStatus status) {
        this.id = id;
        this.content = content;
        this.status = status;
    }

}