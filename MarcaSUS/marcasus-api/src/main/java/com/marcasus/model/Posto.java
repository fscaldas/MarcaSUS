package com.marcasus.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Posto {

    @Id
    @Column(name = "id_posto")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    private String nome;

}
