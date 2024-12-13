package com.marcasus.controller;

import com.marcasus.model.Posto;
import com.marcasus.repository.PostoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/postos")
public class PostoController {

    @Autowired
    private PostoRepository postoRepository;

    @GetMapping
    public List<Posto> listar() {
        return this.postoRepository.findAll();
    }

}
