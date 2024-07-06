package web.uet.backend.entity.business;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import web.uet.backend.entity.enums.ShopType;
import web.uet.backend.entity.location.Commune;
import web.uet.backend.event.ShopUpdateEvent;
import web.uet.backend.service.PublisherService;


@Entity
@Table(schema = "public", name = "shop")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Shop {

    @Id
    @Column(name = "shop_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shopId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "shop_type")
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private ShopType type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "commune_id")
    private Commune commune;

    @Column(name = "employee_number")
    private Integer employeeNumber;

    @Column(name = "coming_delivery_number")
    private Integer comingDeliveryNumber;

    @Column(name = "current_delivery_number")
    private Integer currentDeliveryNumber;

    @Column(name = "gone_delivery_number")
    private Integer goneDeliveryNumber;

    @PostUpdate
    public void postUpdate() {
        PublisherService.INSTANCE.publishEvent(new ShopUpdateEvent(this));
    }

}