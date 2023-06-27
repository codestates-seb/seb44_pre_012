package pre_Project.server.domain.comment.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pre_Project.server.domain.comment.dto.CommentPatchDto;
import pre_Project.server.domain.comment.dto.CommentPostDto;
import pre_Project.server.domain.comment.entity.Comment;
import pre_Project.server.domain.comment.mapper.CommentMapper;
import pre_Project.server.domain.comment.service.CommentService;
import pre_Project.server.global.response.MultiResponseDto;
import pre_Project.server.global.response.SingleResponseDto;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;


    //댓글 만들기
    @PostMapping("/register/{answerId}")
    public ResponseEntity postComment(@PathVariable("answerId") long answerId,
                                      @Valid @RequestBody CommentPostDto commentPostDto) {

        Comment comment = mapper.commentPostDtoToComment(answerId, commentPostDto);
        Comment saveComment = commentService.createComment(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponseDto(saveComment)), HttpStatus.CREATED);
    }

    //댓글 업데이트
    @PatchMapping("/edit/{commentId}")
    public ResponseEntity patchComment(@PathVariable("commentId") long commentId, @Valid @RequestBody CommentPatchDto commentPatchDto) {

        commentPatchDto.setCommentId(commentId);
        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);
        Comment updateComment = commentService.updateComment(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponseDto(updateComment)), HttpStatus.OK);
    }

    //댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable("commentId") long commentId) {

        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //댓글 하나 조회
    @GetMapping("/{commentId}")
    public ResponseEntity getComment(@PathVariable("commentId") long commentId) {
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)), HttpStatus.OK);
    }

    //전체 댓글 조회
    @GetMapping
    public ResponseEntity getComments(@RequestParam(required = false, defaultValue = "1") int page,
                                      @RequestParam(required = false, defaultValue = "10") int size) {

        Page<Comment> pageComments = commentService.findComments(page - 1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.CommentsToCommentResponseDtos(comments), pageComments), HttpStatus.OK);
    }
}




























