package com.marcasus.controller;

import com.marcasus.model.Consulta;
import com.marcasus.model.Pessoa;
import com.marcasus.repository.ConsultaRepository;
import com.marcasus.repository.PessoaRepository;
import com.marcasus.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ConsultaService consultaService;

    @PostMapping
    public Consulta criar(@RequestBody Consulta consulta) {
        return this.consultaService.criar(consulta);
    }

    @GetMapping
    public List<Consulta> listar() {
        return this.consultaRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void excluir(@RequestParam Long id) {
        this.consultaService.excluir(id);
    }

    @GetMapping("/por-pessoa/{cpf}")
    public List<Consulta> porPessoa(@RequestParam String cpf) {
        Pessoa pessoa = this.pessoaRepository.findByIdOrThrow(cpf);
        return this.consultaRepository.findAllByPessoa(pessoa);
    }

}
