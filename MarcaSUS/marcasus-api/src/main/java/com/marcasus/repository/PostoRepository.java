package com.marcasus.repository;

import com.marcasus.model.Medico;
import com.marcasus.model.Posto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public interface PostoRepository extends JpaRepository<Posto, Long> {

    public default Posto findByIdOrThrow(Long id) {
        return this.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Posto não encontrado"));
    }

    public List<Posto> findAllByEnderecoBairro(String bairro);

}
