package com.marcasus.controller;

import com.marcasus.dto.AgendasDisponiveisVsOcupadasDTO;
import com.marcasus.model.Agenda;
import com.marcasus.repository.AgendaRepository;
import com.marcasus.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendas")
public class AgendaController {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private AgendaService agendaService;

    @PostMapping
    public Agenda criar(@RequestBody Agenda agenda) {
        return this.agendaService.criar(agenda);
    }

    @GetMapping
    public List<Agenda> listar() {
        return this.agendaRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void excluir(@RequestParam Long id) {
        this.agendaService.excluir(id);
    }

    @GetMapping("/disponiveis-por-pessoa/{cpf}")
    public List<Agenda> disponiveisPorPessoa(@RequestParam String cpf) {
        return this.agendaService.agendasDisponiveisPorPessoa(cpf);
    }

    @GetMapping("/disponiveis-por-medico/{crm}")
    public List<Agenda> disponiveisPorMedico(@RequestParam String crm) {
        return this.agendaService.agendasDisponiveisPorMedico(crm);
    }

    @GetMapping("/disponiveis-vs-ocupadas")
    public AgendasDisponiveisVsOcupadasDTO disponiveisVsOcupadas() {
        return this.agendaService.agendasDisponiveisVsOcupadas();
    }

}
