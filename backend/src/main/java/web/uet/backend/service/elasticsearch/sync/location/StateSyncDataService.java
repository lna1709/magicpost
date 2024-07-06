package web.uet.backend.service.elasticsearch.sync.location;

import org.springframework.stereotype.Service;
import web.uet.backend.document.location.StateDocument;
import web.uet.backend.entity.location.State;
import web.uet.backend.mapper.location.document.StateDocumentMapper;
import web.uet.backend.repository.location.elasticsearch.StateDocumentRepository;
import web.uet.backend.repository.location.jpa.StateRepository;
import web.uet.backend.service.elasticsearch.sync.GenericSyncDataService;

@Service
public class StateSyncDataService extends GenericSyncDataService<
    StateDocument, State, Integer,
    StateDocumentRepository, StateRepository, StateDocumentMapper> {

  public StateSyncDataService(StateDocumentRepository dr, StateRepository er, StateDocumentMapper m) {
    super(dr, er, m);
  }
}
