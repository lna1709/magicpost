package web.uet.backend.mapper.business.document;

import org.mapstruct.Mapper;
import web.uet.backend.document.business.ShopDocument;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.mapper.GenericMapper;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface ShopDocumentMapper extends GenericMapper<ShopDocument, Shop> {
}
