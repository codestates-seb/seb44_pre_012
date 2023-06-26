package pre_Project.server.domain.answer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.global.audit.Auditable;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String answerContent;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_NOT_SELECT;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // @OneToMany(mappedBy = "answer", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    // private List<Comment> comments = new ArrayList<>();

        public enum AnswerStatus{
        ANSWER_SELECT("답변 채택"),
        ANSWER_NOT_SELECT("답변 미채택");

        @Getter
        private String status;

        AnswerStatus(String status) {
            this.status = status;
        }
    }

}