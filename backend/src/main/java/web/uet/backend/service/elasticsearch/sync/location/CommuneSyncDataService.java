package web.uet.backend.service.elasticsearch.sync.location;

import org.springframework.stereotype.Service;
import web.uet.backend.document.location.CommuneDocument;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.mapper.location.document.CommuneDocumentMapper;
import web.uet.backend.repository.location.elasticsearch.CommuneDocumentRepository;
import web.uet.backend.repository.location.jpa.CommuneRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

@Service
public class CommuneSyncDataService extends GenericSyncDataService<CommuneDocument, Commune, Integer, CommuneDocumentRepository, CommuneRepository, CommuneDocumentMapper> {
  public CommuneSyncDataService(CommuneDocumentRepository communeDocumentRepository, CommuneRepository communeRepository, CommuneDocumentMapper communeDocumentMapper) {
    super(communeDocumentRepository, communeRepository, communeDocumentMapper);
  }
}
