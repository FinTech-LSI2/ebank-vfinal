package net.mahdi.clientservice.models;
import jakarta.persistence.*;
import lombok.*;
import net.mahdi.clientservice.enums.StatusCompte;
import net.mahdi.clientservice.enums.TypeCompte;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "comptes")
public class Compte {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // @Column(nullable = false)
    private String rib;

    @Column(nullable = false)
    private Double balance;

    @Column(nullable = false)
    private Date createdDate = new Date();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusCompte status;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeCompte typeCompte;

    @Column(nullable = false)
    private long idClient;
}
