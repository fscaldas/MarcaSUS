package com.marcasus.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Consulta {

    @Id
    @SequenceGenerator(name = "gen_consulta", sequenceName = "seq_consulta", allocationSize = 1)
    @GeneratedValue(generator = "gen_consulta", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_consulta")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cpf")
    private Pessoa pessoa;

    @ManyToOne
    @JoinColumn(name = "id_agenda")
    private Agenda agenda;

}
