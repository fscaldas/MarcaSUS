package com.marcasus.repository;

import com.marcasus.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public interface MedicoRepository extends JpaRepository<Medico, String> {

    public default Medico findByIdOrThrow(String crm) {
        return this.findById(crm)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "CRM não encontrado"));
    }

}
