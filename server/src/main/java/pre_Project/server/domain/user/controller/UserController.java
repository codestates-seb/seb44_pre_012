package pre_Project.server.domain.user.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pre_Project.server.domain.user.dto.UserDto;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.domain.user.mapper.UserMapper;
import pre_Project.server.domain.user.service.UserService;
import pre_Project.server.global.response.MultiResponseDto;
import pre_Project.server.global.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }
    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody UserDto.Register requestBody) {
        User user = mapper.userRegisterToUser(requestBody);
        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(createdUser)),
                HttpStatus.CREATED);
    }
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch requestBody) {
        requestBody.setUserId(userId);
        User user = mapper.userPatchToUser(requestBody);
        userService.updateUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(user)),
                HttpStatus.OK);
    }
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.userToUserResponse(user)),
                        HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<User> pageUser = userService.findUsers(page - 1, size);
        List<User> users = pageUser.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToResponseList(users),pageUser),
                HttpStatus.OK);
    }
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
