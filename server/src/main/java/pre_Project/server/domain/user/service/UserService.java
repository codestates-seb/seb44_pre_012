package pre_Project.server.domain.user.service;

import org.mapstruct.control.MappingControl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import pre_Project.server.domain.user.entitiy.User;
import pre_Project.server.domain.user.repository.UserRepository;
import pre_Project.server.global.auth.utills.CustomAuthorityUtills;
import pre_Project.server.global.exception.BusinessLogicException;
import pre_Project.server.global.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtills authorityUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtills authorityUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public User createUser(User user){
        verifyExistsEmail(user.getEmail());

        String encryptedPassword = passwordEncoder.encode(user.getPassWord()); // password 암호화
        user.setPassWord(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail()); // 유저 권한 설정
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        return savedUser;
    }
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public User updateUser(User user){
        User finduser = findVerifiedUser(user.getUserId());

        Optional.ofNullable(user.getUserName())
                .ifPresent(name -> user.setUserName(name));
        Optional.ofNullable(user.getPassWord())
                .ifPresent(password -> user.setPassWord(password));
        return userRepository.save(user);
    }
    @Transactional(readOnly = true)
    public User findUser(long userId){
        return findVerifiedUser(userId);
    }
    public Page<User> findUsers(int page, int size){
        return userRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }
    public void deleteUser(long userId){
        User user = findVerifiedUser(userId);
        user.setUserStatus(User.UserStatus.USER_QUIT);
        userRepository.save(user);
    }
    @Transactional(readOnly = true)
    public User findVerifiedUser(long userId){
        Optional<User> optionalUser =
                userRepository.findById(userId);
        User findUser =
                optionalUser.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findUser;
    }
    public void verifyExistsEmail(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }


}
