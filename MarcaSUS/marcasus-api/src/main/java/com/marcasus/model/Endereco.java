package com.marcasus.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Endereco {

    @Id
    @Column(name = "id_endereco")
    private Long id;

    private String bairro;

}
