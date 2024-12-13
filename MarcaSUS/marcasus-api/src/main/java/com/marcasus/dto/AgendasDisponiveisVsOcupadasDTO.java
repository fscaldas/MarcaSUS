package com.marcasus.dto;

import com.marcasus.model.Agenda;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AgendasDisponiveisVsOcupadasDTO {

    List<Agenda> agendasDisponiveis;

    List<Agenda> agendasOcupadas;

}
