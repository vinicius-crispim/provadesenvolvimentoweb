package com.web.prova.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.prova.entities.Produto;
@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Long> {
    
}