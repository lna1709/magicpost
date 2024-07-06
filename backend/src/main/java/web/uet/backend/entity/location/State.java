package web.uet.backend.entity.location;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;


@Entity
@Table(schema = "public", name = "state")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data

public class State {
    @Id
    @Column(name = "state_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stateId;

    @Column(name = "name")
    private String name;
}
