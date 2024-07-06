package web.uet.backend.repository.location.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.uet.backend.entity.location.Province;
import web.uet.backend.entity.location.State;

import java.util.List;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Integer> {
  public List<Province> findAllByState(State state);
}
