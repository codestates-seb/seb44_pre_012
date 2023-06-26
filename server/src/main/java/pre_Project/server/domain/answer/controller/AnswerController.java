package pre_Project.server.domain.answer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pre_Project.server.domain.answer.dto.AnswerPatchDto;
import pre_Project.server.domain.answer.dto.AnswerPostDto;
import pre_Project.server.domain.answer.entity.Answer;
import pre_Project.server.domain.answer.mapper.AnswerMapper;
import pre_Project.server.domain.answer.service.AnswerService;
import pre_Project.server.global.response.SingleResponseDto;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/answers")

public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper mapper;

    @PostMapping("/register")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {
        Answer answer = mapper.answerPostDtoToAnswer(answerPostDto);
        Answer saveAnswer = answerService.createAnswer(answer);


        return new ResponseEntity<>(new SingleResponseDto<>(mapper.answerToAnswerResponseDto(saveAnswer)), HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{answerId}")
    public ResponseEntity patchAnswer(@PathVariable("answerId") long answerId, @Valid @RequestBody AnswerPatchDto answerPatchDto) {

        answerPatchDto.setAnswerId(answerId);
        Answer answer = mapper.answerPatchDtoToAnswer(answerPatchDto);
        Answer updateAnswer = answerService.updateAnswer(answer);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.answerToAnswerResponseDto(updateAnswer)), HttpStatus.OK);
    }

    @DeleteMapping("{answerId}")
    public ResponseEntity deleteAnswer(@PathVariable("answerId") long answerId) {
        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

