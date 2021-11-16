package com.web.prova.resources;
import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.web.prova.entities.Produto;
import com.web.prova.facade.ProdutoFacade;

@RestController
@RequestMapping(value = "/produtos")
public class ProdutoResource {
	@Autowired
	private ProdutoFacade produtofacade;

	@GetMapping
	public ResponseEntity<Page<Produto>> findAll(Pageable pageable) {

		Page<Produto> list = produtofacade.findAllProduto(pageable);

		return ResponseEntity.ok().body(list);
	}

	// caso inserir uma barra e um id, ele faz esta busca
	@GetMapping(value = "/{id}")
	public ResponseEntity<Produto> findById(@PathVariable Long id) {
		Produto u = produtofacade.findProdutoById(id);
		return ResponseEntity.ok().body(u);
	}

	// Post para inserir no banco
	// RequestBody para informar que o objeto vai chegar no modo Json
	@PostMapping
	public ResponseEntity<Produto> saveProduto(@RequestBody Produto produto) {
		produto = produtofacade.saveProduto(produto);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(produto.getId())
				.toUri();

		return ResponseEntity.created(uri).body(produto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
		produtofacade.deleteProduto(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Produto> updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
		produto = produtofacade.updateProduto(id, produto);
		return ResponseEntity.ok().body(produto);
	}

}