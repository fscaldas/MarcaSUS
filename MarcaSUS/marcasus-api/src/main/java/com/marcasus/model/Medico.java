package com.marcasus.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Medico {

    @Id
    private String crm;

    private String nome;

    private String especialidade;

}
