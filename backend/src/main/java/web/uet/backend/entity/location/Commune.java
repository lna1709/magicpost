package web.uet.backend.entity.location;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(schema = "public", name = "commune")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Commune {
    @Id
    @Column(name = "commune_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer communeId;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
}