package web.uet.backend.repository.location.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.location.District;
import web.uet.backend.entity.location.Province;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
  List<District> findByProvinceAndNameContaining(Province province, String name);

  List<District> findByProvince(Province province);

}
