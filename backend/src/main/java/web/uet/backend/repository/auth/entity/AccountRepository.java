package web.uet.backend.repository.auth.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.entity.auth.Account;
import web.uet.backend.entity.business.Shop;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

  Optional<Account> findByUsername(String username);

  Boolean existsByWorkAtAndRole(Shop workAt, Role role);
}
