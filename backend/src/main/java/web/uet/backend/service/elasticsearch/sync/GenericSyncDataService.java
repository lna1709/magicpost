package web.uet.backend.service.elasticsearch.sync;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import web.uet.backend.mapper.GenericMapper;

import java.util.List;

@AllArgsConstructor
public abstract class GenericSyncDataService<
    D, E, T,
    DR extends ElasticsearchRepository<D, T>,
    ER extends JpaRepository<E, T>,
    M extends GenericMapper<D, E>> {

  protected DR dr;
  protected ER er;
  protected M m;

  @PostConstruct
  protected void syncData() {
    List<E> entities = er.findAll();
    List<D> documents = m.toDto(entities);
    dr.deleteAll();
    dr.saveAll(documents);
  }

}
