package com.marcasus.service;

import com.marcasus.model.Agenda;
import com.marcasus.model.Consulta;
import com.marcasus.model.Pessoa;
import com.marcasus.repository.AgendaRepository;
import com.marcasus.repository.ConsultaRepository;
import com.marcasus.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@Service
public class ConsultaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private ConsultaRepository consultaRepository;

    public Consulta criar(Consulta consulta) {
        consulta.setId(null);
        Pessoa pessoa = consulta.getPessoa();
        Agenda agenda = consulta.getAgenda();
        if (Objects.isNull(pessoa))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "É necessário informar um pessoa para marcar a consulta");
        if (Objects.isNull(agenda))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "É necessário informar uma agenda para marcar a consulta");
        pessoa = this.pessoaRepository.findByIdOrThrow(pessoa.getCpf());
        agenda = this.agendaRepository.findByIdOrThrow(agenda.getId());
        if ( this.consultaRepository.existsConsultaByAgenda(agenda) )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A agenda selecionada já está ocupada com uma consulta");
        return this.consultaRepository.save(consulta);
    }

    public void excluir(Long id) {
        Consulta consulta = this.consultaRepository.findByIdOrThrow(id);
        this.consultaRepository.delete(consulta);
    }

}
