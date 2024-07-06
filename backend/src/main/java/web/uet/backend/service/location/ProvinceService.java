package web.uet.backend.service.location;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.uet.backend.document.location.ProvinceDocument;
import web.uet.backend.dto.location.response.ProvinceGeneralResponseList;
import web.uet.backend.entity.location.Province;
import web.uet.backend.entity.location.State;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.location.document.ProvinceDocumentMapper;
import web.uet.backend.mapper.location.response.ProvinceGeneralFromDocumentMapper;
import web.uet.backend.mapper.location.response.ProvinceGeneralMapper;
import web.uet.backend.repository.location.elasticsearch.ProvinceDocumentRepository;
import web.uet.backend.repository.location.jpa.ProvinceRepository;
import web.uet.backend.repository.location.jpa.StateRepository;
import web.uet.backend.service.elasticsearch.sync.location.ProvinceSyncDataService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProvinceService {

  private final ProvinceRepository provinceRepository;
  private final StateRepository stateRepository;

  private final ProvinceDocumentRepository provinceDocumentRepository;

  private final ProvinceGeneralMapper provinceGeneralMapper;
  private final ProvinceDocumentMapper provinceDocumentMapper;
  private final ProvinceGeneralFromDocumentMapper provinceGeneralFromDocumentMapper;

  public ProvinceGeneralResponseList getByStateId(Integer stateId) {
    State state = stateRepository.findById(stateId)
        .orElseThrow(() -> new NotFoundException("State not found"));

    List<Province> provinces = provinceRepository.findAllByState(state);
    return ProvinceGeneralResponseList.builder()
        .stateId(stateId)
        .provinces(provinceGeneralMapper.toDto(provinces))
        .build();
  }

  public ProvinceGeneralResponseList getAll() {
    List<Province> provinces = provinceRepository.findAll();
    return ProvinceGeneralResponseList.builder()
        .provinces(provinceGeneralMapper.toDto(provinces))
        .build();
  }

  public ProvinceGeneralResponseList getAutoByKeyword(String keyword) {
    List<ProvinceDocument> provinceDocuments = provinceDocumentRepository.findByNameContaining(keyword);

    return ProvinceGeneralResponseList.builder()
        .provinces(provinceGeneralFromDocumentMapper.toDto(provinceDocuments))
        .build();
  }
}
