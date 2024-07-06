package web.uet.backend.entity.location;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(schema = "public", name = "province")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Province {
    @Id
    @Column(name = "province_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer provinceId;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;
}