package pre_Project.server.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    QUESTION_NOT_FOUND(404, "Question Not Found"),
    ANSWER_NOT_FOUND(404,"Answer Not Found"),

    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    USER_NOT_FOUND(404,"User Not Found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}