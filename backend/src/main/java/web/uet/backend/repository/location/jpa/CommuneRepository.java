package web.uet.backend.repository.location.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.entity.location.District;

import java.util.List;

@Repository
public interface CommuneRepository extends JpaRepository<Commune, Integer> {
  List<Commune> findByDistrict(District district);

  List<Commune> findByDistrictAndNameContaining(District district, String name);
}
