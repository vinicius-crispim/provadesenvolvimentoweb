package com.web.prova.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.web.prova.entities.Marca;
import com.web.prova.facade.CarroFacade;

@RestController
@RequestMapping(value = "/marcas")
public class MarcaResource {
    @Autowired 
    private CarroFacade carrofacade;

	@GetMapping
	public ResponseEntity<List<Marca>> findAll(){

		List<Marca> list = carrofacade.findAllMarca();
		return ResponseEntity.ok().body(list);
	}
	
	//caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value="/{id}")
	public ResponseEntity<Marca> findById(@PathVariable Long id){
		Marca u = carrofacade.findMarcaById(id);
		return ResponseEntity.ok().body(u);
	}
	
	//Post para inserir no banco
	//RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Marca> saveMarca(@RequestBody Marca marca){
		marca = carrofacade.saveMarca(marca);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(marca.getId())
				.toUri();
		
		return ResponseEntity.created(uri).body(marca);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteMarca(@PathVariable Long id){
		carrofacade.deleteMarca(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Marca> updateMarca(@PathVariable Long id, @RequestBody Marca marca){
		marca = carrofacade.updateMarca(id, marca);
		return ResponseEntity.ok().body(marca);
	}
	

}