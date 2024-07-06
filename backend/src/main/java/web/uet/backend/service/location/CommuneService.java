package web.uet.backend.service.location;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.uet.backend.document.location.CommuneDocument;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.dto.location.response.CommuneGeneralResponseList;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.entity.location.District;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.location.response.CommuneGeneralFromDocumentMapper;
import web.uet.backend.mapper.location.response.CommuneGeneralMapper;
import web.uet.backend.repository.location.elasticsearch.CommuneDocumentRepository;
import web.uet.backend.repository.location.elasticsearch.DistrictDocumentRepository;
import web.uet.backend.repository.location.jpa.CommuneRepository;
import web.uet.backend.repository.location.jpa.DistrictRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommuneService {

  private final CommuneRepository communeRepository;
  private final DistrictRepository districtRepository;

  private final CommuneDocumentRepository communeDocumentRepository;
  private final DistrictDocumentRepository districtDocumentRepository;

  private final CommuneGeneralMapper communeGeneralMapper;
  private final CommuneGeneralFromDocumentMapper communeGeneralFromDocumentMapper;

  public CommuneGeneralResponseList getByDistrictId(Integer districtId) {
    District district = districtRepository.findById(districtId)
        .orElseThrow(() -> new NotFoundException("District not found"));

    List<Commune> communes = communeRepository.findByDistrict(district);

    return CommuneGeneralResponseList.builder()
        .communes(communeGeneralMapper.toDto(communes))
        .build();
  }

  public CommuneGeneralResponseList getByKeyword(String keyword, Integer districtId) {
    District district = districtRepository.findById(districtId)
        .orElseThrow(() -> new NotFoundException("District not found"));

    List<Commune> communes = communeRepository.findByDistrictAndNameContaining(district, keyword);

    return CommuneGeneralResponseList.builder()
        .communes(communeGeneralMapper.toDto(communes))
        .build();
  }


}
