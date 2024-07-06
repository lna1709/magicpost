package web.uet.backend.entity.business;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;
import web.uet.backend.entity.enums.StatusType;
import web.uet.backend.event.DeliveryStatusCreateEvent;
import web.uet.backend.service.PublisherService;

import java.time.LocalDateTime;

@Entity
@Table(schema = "public", name = "delivery_status")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DeliveryStatus {
    @Id
    @Column(name = "delivery_status_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deliveryStatusId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {})
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "delivery_status_type")
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private StatusType statusType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "current_shop_id")
    private Shop currentShop;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PostPersist
    @Transactional
    public void prePersist() {
        PublisherService.INSTANCE.publishEvent(new DeliveryStatusCreateEvent(this));
    }
}
