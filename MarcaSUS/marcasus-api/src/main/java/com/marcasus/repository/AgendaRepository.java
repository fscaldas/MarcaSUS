package com.marcasus.repository;

import com.marcasus.model.Agenda;
import com.marcasus.model.Medico;
import com.marcasus.model.Posto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {

    public default Agenda findByIdOrThrow(Long id) {
        return this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Agenda não encontrada"));
    }

    public List<Agenda> findAllByPostoIn(List<Posto> postos);

    public List<Agenda> findAllByMedico(Medico medico);

    public Long countAgendaByMedicoAndHorario(Medico medico, Date horario);

}
