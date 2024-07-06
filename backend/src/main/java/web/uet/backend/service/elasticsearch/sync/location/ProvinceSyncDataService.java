package web.uet.backend.service.elasticsearch.sync.location;

import org.springframework.stereotype.Service;
import web.uet.backend.document.location.ProvinceDocument;
import web.uet.backend.entity.location.Province;
import web.uet.backend.mapper.location.document.ProvinceDocumentMapper;
import web.uet.backend.repository.location.elasticsearch.ProvinceDocumentRepository;
import web.uet.backend.repository.location.jpa.ProvinceRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

@Service
public class ProvinceSyncDataService extends GenericSyncDataService<
    ProvinceDocument, Province, Integer, ProvinceDocumentRepository, ProvinceRepository, ProvinceDocumentMapper> {

  public ProvinceSyncDataService(ProvinceDocumentRepository provinceDocumentRepository, ProvinceRepository provinceRepository, ProvinceDocumentMapper provinceDocumentMapper) {
    super(provinceDocumentRepository, provinceRepository, provinceDocumentMapper);
  }
}
