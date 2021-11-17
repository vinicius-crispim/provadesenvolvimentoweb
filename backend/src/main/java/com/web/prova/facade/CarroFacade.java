package com.web.prova.facade;
import java.util.List;

import javax.annotation.ManagedBean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.web.prova.entities.Carro;
import com.web.prova.entities.Marca;
import com.web.prova.services.CarroService;
import com.web.prova.services.MarcaService;

@ManagedBean
public class CarroFacade {

	@Autowired
	private MarcaService cateservice;

	@Autowired
	private CarroService carroservice;

	// inicio Marca

	public List<Marca> findAllMarca() {
		return cateservice.findAll();
	}

	public Marca findMarcaById(Long id) {
		return cateservice.findById(id);

	}

	public Marca saveMarca(Marca categoria) {
		return cateservice.saveMarca(categoria);
	}

	public void deleteMarca(Long id) {
			cateservice.deleteMarca(id);
	}

	public Marca updateMarca(Long id, Marca categoria) {
			return cateservice.updateMarca(id, categoria);
	}

	// fim Marca

	// inicio Carro

		public List<Carro> findAllCarro() {
			return carroservice.findAll();
		}

		public List<Carro> findAllAtivo() {
			return carroservice.findAllAtivo();
		}
		
		public List<Carro> findByNome(String nome) {
			return carroservice.findByNome(nome);
		}
		
		public List<Carro> findByMarca(Long id) {
			return carroservice.FindByMarca(id);
		}
		
		public Carro findCarroById(Long id) {
			return carroservice.findById(id);

		}

		public Carro saveCarro(Carro produto) {
			return carroservice.saveCarro(produto);
		}

		public void deleteCarro(Long id) {
			carroservice.deleteCarro(id);
		}

		public Carro updateCarro(Long id, Carro produto) {
				return carroservice.updateCarro(id, produto);
		}

		// fim Carro
}