package com.marcasus.repository;

import com.marcasus.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public interface PessoaRepository extends JpaRepository<Pessoa, String> {

    public default Pessoa findByIdOrThrow(String cpf) {
        return this.findById(cpf)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF não encontrado"));
    }

}
