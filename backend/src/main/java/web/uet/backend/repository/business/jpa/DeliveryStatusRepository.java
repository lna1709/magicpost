package web.uet.backend.repository.business.jpa;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.business.Delivery;
import web.uet.backend.entity.business.DeliveryStatus;

import java.util.List;

@Repository
public interface DeliveryStatusRepository extends JpaRepository<DeliveryStatus, Integer> {
  List<DeliveryStatus> findByDelivery(Delivery delivery, Sort sort);
}
