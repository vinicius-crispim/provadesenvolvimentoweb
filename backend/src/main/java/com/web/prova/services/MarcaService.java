package com.web.prova.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.web.prova.entities.Marca;
import com.web.prova.repositories.MarcaRepository;
import com.web.prova.services.exceptions.DatabaseException;
import com.web.prova.services.exceptions.ResourceNotFoundException;

@Service
public class MarcaService {
	@Autowired
	private MarcaRepository repository;

	public List<Marca> findAll() {
		return repository.findAll();
	}

	public Marca findById(Long id) {
		Optional<Marca> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Marca saveMarca(Marca categoria) {
		return repository.save(categoria);
	}

	public void deleteMarca(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}

	// getOne apenas pega o objeto monitorado e depois mexe no banco, o findBy pega
	// no banco
	public Marca updateMarca(Long id, Marca categoria) {
		try {
			Marca obj = repository.getOne(id);
			updateData(obj, categoria);
			return repository.save(obj);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Marca obj, Marca categoria) {

		obj.setNome(categoria.getNome());
	}

}