package com.web.prova.resources;
import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.web.prova.entities.Carro;
import com.web.prova.facade.CarroFacade;

@RestController
@RequestMapping(value = "/carros")
public class CarroResource {
	@Autowired
	private CarroFacade carrofacade;

	@GetMapping
	public ResponseEntity<List<Carro>> findAll() {

		List<Carro> list = carrofacade.findAllCarro();

		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value="/ativo")
	public ResponseEntity<List<Carro>> findAllAtivo() {

		List<Carro> list = carrofacade.findAllAtivo();

		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/buscapornome/{nome}")
	public ResponseEntity<List<Carro>> findByNome(@PathVariable String nome) {

		List<Carro> list = carrofacade.findByNome(nome);

		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value="/buscapormarca/{id}")
	public ResponseEntity<List<Carro>> findByMarca(@PathVariable Long id) {

		List<Carro> list = carrofacade.findByMarca(id);

		return ResponseEntity.ok().body(list);
	}
	
	// caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value = "/{id}")
	public ResponseEntity<Carro> findById(@PathVariable Long id) {
		Carro u = carrofacade.findCarroById(id);
		return ResponseEntity.ok().body(u);
	}

	// Post para inserir no banco
	// RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Carro> saveCarro(@RequestBody Carro carro) {
		carro = carrofacade.saveCarro(carro);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(carro.getId())
				.toUri();

		return ResponseEntity.created(uri).body(carro);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteCarro(@PathVariable Long id) {
		carrofacade.deleteCarro(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Carro> updateCarro(@PathVariable Long id, @RequestBody Carro carro) {
		carro = carrofacade.updateCarro(id, carro);
		return ResponseEntity.ok().body(carro);
	}

}