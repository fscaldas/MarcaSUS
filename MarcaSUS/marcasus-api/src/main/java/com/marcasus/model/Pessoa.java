package com.marcasus.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Pessoa {

    @Id
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    private String nome;

}
