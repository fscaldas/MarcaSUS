package com.marcasus.repository;

import com.marcasus.model.Agenda;
import com.marcasus.model.Consulta;
import com.marcasus.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    public default Consulta findByIdOrThrow(Long id) {
        return this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Consulta não encontrada"));
    }

    public List<Consulta> findAllByAgendaIn(List<Agenda> agendas);

    public Boolean existsConsultaByAgenda(Agenda agenda);

    public List<Consulta> findAllByPessoa(Pessoa pessoa);

}
