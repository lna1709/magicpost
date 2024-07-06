package web.uet.backend.service.location;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import web.uet.backend.document.location.DistrictDocument;
import web.uet.backend.document.location.ProvinceDocument;
import web.uet.backend.dto.location.response.DistrictGeneralResponse;
import web.uet.backend.dto.location.response.DistrictGeneralResponseList;
import web.uet.backend.entity.location.District;
import web.uet.backend.entity.location.Province;
import web.uet.backend.exception.type.NotFoundException;
import web.uet.backend.mapper.location.document.ProvinceDocumentMapper;
import web.uet.backend.mapper.location.response.DistrictGeneralFromDocumentMapper;
import web.uet.backend.mapper.location.response.DistrictGeneralMapper;
import web.uet.backend.repository.location.elasticsearch.DistrictDocumentRepository;
import web.uet.backend.repository.location.elasticsearch.ProvinceDocumentRepository;
import web.uet.backend.repository.location.jpa.DistrictRepository;
import web.uet.backend.repository.location.jpa.ProvinceRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DistrictService {

  private final DistrictRepository districtRepository;
  private final ProvinceRepository provinceRepository;

  private final DistrictDocumentRepository districtDocumentRepository;
  private final ProvinceDocumentRepository provinceDocumentRepository;

  private final DistrictGeneralMapper districtGeneralMapper;
  private final DistrictGeneralFromDocumentMapper districtGeneralFromDocumentMapper;
  private final ProvinceDocumentMapper provinceDocumentMapper;

  public DistrictGeneralResponseList getByProvinceId(Integer provinceId) {
    Province province = provinceRepository.findById(provinceId)
        .orElseThrow(() -> new NotFoundException("Province not found"));

    List<District> districts = districtRepository.findByProvince(province);

    return DistrictGeneralResponseList.builder()
        .districts(districtGeneralMapper.toDto(districts))
        .build();
  }

  public DistrictGeneralResponseList getByKeyword(String keyword, Integer provinceId) {
    Province province = provinceRepository.findById(provinceId)
        .orElseThrow(() -> new NotFoundException("Province not found"));

    List<District> districts = districtRepository.findByProvinceAndNameContaining(province, keyword);

    return DistrictGeneralResponseList.builder()
        .districts(districtGeneralMapper.toDto(districts))
        .build();
  }

}
