package pre_Project.server.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pre_Project.server.domain.user.entitiy.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
}
