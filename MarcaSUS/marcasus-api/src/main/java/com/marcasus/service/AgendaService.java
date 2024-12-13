package com.marcasus.service;

import com.marcasus.dto.AgendasDisponiveisVsOcupadasDTO;
import com.marcasus.model.*;
import com.marcasus.repository.*;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private PostoRepository postoRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    public Agenda criar(Agenda agenda) {
        agenda.setId(null);
        Medico medico = agenda.getMedico();
        Posto posto = agenda.getPosto();
        Date horario = agenda.getHorario();
        if ( Objects.isNull(medico) )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "É necessário informar um Médico para o agendamento");
        if ( Objects.isNull(posto) )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "É necessário informar um Posto para o agendamento");
        if ( Objects.isNull(horario) )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "É necessário informar um horário para o agendamento");
        posto = this.postoRepository.findByIdOrThrow(posto.getId());
        medico = this.medicoRepository.findByIdOrThrow(medico.getCrm());
        if ( this.agendaRepository.countAgendaByMedicoAndHorario(medico, horario) > 0 )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este horário já está ocupado");
        return this.agendaRepository.save(agenda);
    }

    public void excluir(Long id) {
        Agenda agenda = this.agendaRepository.findByIdOrThrow(id);
        if ( this.consultaRepository.existsConsultaByAgenda(agenda) )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Esta agenda possui uma consulta marcada");
        this.agendaRepository.delete(agenda);
    }

    public List<Agenda> agendasDisponiveisPorPessoa(String cpf) {
        Pessoa pessoa = this.pessoaRepository.findByIdOrThrow(cpf);
        if ( Objects.isNull(pessoa.getEndereco()) )
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "CPF sem endereço cadastrado");
        String bairro = pessoa.getEndereco().getBairro();
        if (Strings.isBlank(bairro) )
            throw  new ResponseStatusException(HttpStatus.NOT_FOUND, "CPF com endereço incompleto");
        List<Posto> postos = this.postoRepository.findAllByEnderecoBairro(bairro);
        if ( postos.isEmpty() )
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sem Postos disponíveis para atendimento");
        List<Agenda> agendasCadastradas = this.agendaRepository.findAllByPostoIn(postos);
        return this.consultarAgendasDisponiveis(agendasCadastradas);
    }
    public List<Agenda> agendasDisponiveisPorMedico(String crm) {
        Medico medico = this.medicoRepository.findByIdOrThrow(crm);
        List<Agenda> agendasCadastradas = this.agendaRepository.findAllByMedico(medico);
        return this.consultarAgendasDisponiveis(agendasCadastradas);
    }

    public AgendasDisponiveisVsOcupadasDTO agendasDisponiveisVsOcupadas() {
        List<Agenda> agendasCadastradas = this.agendaRepository.findAll();
        List<Agenda> agendasOcupadas = this.consultarAgendasOcupadas(agendasCadastradas);
        List<Agenda> agendasDisponiveis = this.consultarAgendasDisponiveis(agendasCadastradas);
        return AgendasDisponiveisVsOcupadasDTO.builder()
                .agendasDisponiveis(agendasDisponiveis)
                .agendasOcupadas(agendasOcupadas)
                .build();
    }

    private List<Agenda> consultarAgendasOcupadas(List<Agenda> agendasCadastradas) {
        return this.consultaRepository.findAllByAgendaIn(agendasCadastradas)
                .stream()
                .map(Consulta::getAgenda)
                .toList();
    }

    private List<Agenda> consultarAgendasDisponiveis(List<Agenda> agendasCadastradas) {
        if ( agendasCadastradas.isEmpty() )
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Não há agendas cadastradas no momento");
        List<Agenda> agendasOcupadas = this.consultarAgendasOcupadas(agendasCadastradas);
        List<Agenda> agendasDisponiveis = agendasCadastradas
                .stream()
                .filter(a -> !agendasOcupadas.contains(a))
                .toList();
        if ( agendasDisponiveis.isEmpty() )
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todas as agendas cadastradas estão ocupadas no momento");
        return agendasDisponiveis;
    }

}
