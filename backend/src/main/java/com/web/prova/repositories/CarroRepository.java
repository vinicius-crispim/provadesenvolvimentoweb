package com.web.prova.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.prova.entities.Carro;
@Repository
public interface CarroRepository extends JpaRepository<Carro,Long> {
    
}