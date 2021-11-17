package com.web.prova.services;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.web.prova.entities.Carro;
import com.web.prova.entities.Marca;
import com.web.prova.repositories.CarroRepository;
import com.web.prova.repositories.MarcaRepository;
import com.web.prova.services.exceptions.DatabaseException;
import com.web.prova.services.exceptions.ResourceNotFoundException;

@Service
public class CarroService {
	@Autowired
	private CarroRepository repository;
	@Autowired
	private MarcaRepository marrepository;

	public List<Carro> findAll() {
		return repository.findAll();	
		}
	
	public List<Carro> findByNome(String nome) {
		List<Carro> list = repository.findAll();
		List<Carro> listlimpa = new ArrayList<Carro>();
		for (Carro carro : list) {
			if (carro.getNome().equals(nome)) {
				listlimpa.add(carro);
			}
		}
		return listlimpa;	
		}
	
	public List<Carro> FindByMarca(Long id) {
		List<Carro> list = repository.findAll();
		Optional<Marca> marca = marrepository.findById(id);
		List<Carro> listlimpa = new ArrayList<Carro>();
		for (Carro carro : list) {
			if (carro.getMarca().getId().equals(id)) {
				listlimpa.add(carro);
			}
		}
		return listlimpa;	
		}
	
	public List<Carro> findAllAtivo() {
		List<Carro> list = repository.findAll();
		List<Carro> listlimpa = new ArrayList<Carro>();
		for (Carro carro : list) {
			if (carro.getStatus() == "Ativo") {
				listlimpa.add(carro);
			}
		}
		return listlimpa;	
		}
	
	@Transactional(readOnly = true)//garante que toda a operaÃ§Ã£o com banco seja resolvida aqui e ReadOnly nao faz lock no banco pois Ã© so select, nao muda nd no banco
	public Carro findById(Long id) {
		Optional<Carro> op = repository.findById(id);
		return op.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Carro saveCarro(Carro carro) {
		return repository.save(carro);
	}

	public void deleteCarro(Long id) {
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
	public Carro updateCarro(Long id, Carro carro) {
		try {
			Carro obj = repository.getOne(id);
			updateData(obj, carro);
			return repository.save(obj);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(Carro obj, Carro carro) {

		obj.setMarca(carro.getMarca());
		obj.setNome(carro.getNome());
		obj.setPreço(carro.getPreço());
		obj.setStatus(carro.getStatus());
		}

}