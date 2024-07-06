package web.uet.backend.repository.business.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.business.Shop;

import java.util.UUID;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer> {

}
