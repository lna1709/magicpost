package web.uet.backend.entity.auth;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import web.uet.backend.entity.enums.Role;
import web.uet.backend.entity.business.Shop;
import web.uet.backend.event.AccountCreateEvent;
import web.uet.backend.service.PublisherService;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(schema = "public", name = "account")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Account {
    @Id
    @Column(name = "account_id")
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID accountId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "cccd")
    private String cccd;

    @Column(name = "address")
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", columnDefinition = "user_role")
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {})
    @JoinColumn(name = "work_at")
    private Shop workAt;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CreationTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PostPersist
    public void postPersist() {
        PublisherService.INSTANCE.publishEvent(new AccountCreateEvent(this));
    }

}
