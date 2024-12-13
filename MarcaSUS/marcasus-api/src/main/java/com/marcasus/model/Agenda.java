package com.marcasus.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Data
public class Agenda {

    @Id
    @SequenceGenerator(name = "gen_agenda", sequenceName = "seq_agenda", allocationSize = 1)
    @GeneratedValue(generator = "gen_agenda", strategy = GenerationType.SEQUENCE)
    @Column(name = "id_agenda")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "crm")
    private Medico medico;

    @ManyToOne
    @JoinColumn(name = "id_posto")
    private Posto posto;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private Date horario;

}
