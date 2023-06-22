package pre_Project.server.domain.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pre_Project.server.domain.question.dto.QuestionPatchDto;
import pre_Project.server.domain.question.dto.QuestionPostDto;
import pre_Project.server.domain.question.dto.QuestionViewDto;
import pre_Project.server.domain.question.entity.Question;
import pre_Project.server.domain.question.mapper.QuestionMapper;
import pre_Project.server.domain.question.service.QuestionService;
import pre_Project.server.global.response.MultiResponseDto;
import pre_Project.server.global.response.SingleResponseDto;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper mapper;


    //질문 만들기
    @PostMapping("/register")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto) {

        Question question = mapper.questionPostDtoToQuestion(questionPostDto);
        Question saveQuestion = questionService.createQuestion(question);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(saveQuestion)), HttpStatus.CREATED);
    }

    //질문 하나 조회
    @GetMapping("/{questionId}")
    public ResponseEntity getQuestion(@PathVariable("questionId") long questionId) {
        Question question = questionService.findQuestion(questionId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(question)), HttpStatus.OK);
    }

    //전체 질문 조회
    @GetMapping
    public ResponseEntity getQuestions(@RequestParam(required = false, defaultValue = "1") int page,
                                       @RequestParam(required = false, defaultValue = "10") int size) {

        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.questionsToQuestionResponseDtos(questions), pageQuestions), HttpStatus.OK);
    }

    //질문 업데이트
    @PatchMapping("/edit/{questionId}")
    public ResponseEntity patchQuestion(@Valid @PathVariable("questionId") long questionId,
                                        @RequestBody QuestionPatchDto questionPatchDto) {

        questionPatchDto.setQuestionId(questionId);
        Question question = mapper.questionPatchDtoToQuestion(questionPatchDto);
        Question saveQuestion = questionService.updateQuestion(question);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(saveQuestion)), HttpStatus.OK);
    }

    //질문 삭제
    @DeleteMapping("/{questionId}")
    public ResponseEntity deleteQuestion(@PathVariable("questionId") long questionId) {

        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //View 업데이트
//    @PatchMapping("/{questionId}")
//    public ResponseEntity updateViewQuestion(@PathVariable("questionId") long questionId,
//                                             @RequestBody QuestionViewDto questionViewDto) {
//        Question question = mapper.questionViewToQuestion(questionViewDto);
//        Question viewQuestion = questionService.updateView(question, questionId);
//
//        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToQuestionResponseDto(viewQuestion)), HttpStatus.OK);
//    }
}
