package com.web.prova.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.prova.entities.Categoria;
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria,Long> {
    
}