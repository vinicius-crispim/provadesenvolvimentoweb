package com.web.prova.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.prova.entities.Marca;
@Repository
public interface MarcaRepository extends JpaRepository<Marca,Long> {
    
}