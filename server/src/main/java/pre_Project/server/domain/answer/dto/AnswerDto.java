package pre_Project.server.domain.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pre_Project.server.domain.answer.entity.Answer;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class AnswerDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotNull
        private Long question_id;
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long id;
        @NotBlank
        private String content;
        public void setId(long id) { this.id = id; }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long id;
        private long question_id;
        private long user_id;
        private String userName;
        private String content;
        private LocalDateTime created_at;
        private LocalDateTime modified_at;
        private Answer.AnswerStatus status;

    }
}