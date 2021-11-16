package com.web.prova.facade;
import java.util.List;

import javax.annotation.ManagedBean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.web.prova.entities.Categoria;
import com.web.prova.entities.Produto;
import com.web.prova.services.CategoriaService;
import com.web.prova.services.ProdutoService;

@ManagedBean
public class ProdutoFacade {

	@Autowired
	private CategoriaService cateservice;

	@Autowired
	private ProdutoService prodservice;

	// inicio Categoria

	public List<Categoria> findAllCategoria() {
		return cateservice.findAll();
	}

	public Categoria findCategoriaById(Long id) {
		return cateservice.findById(id);

	}

	public Categoria saveCategoria(Categoria categoria) {
		return cateservice.saveCategoria(categoria);
	}

	public void deleteCategoria(Long id) {
			cateservice.deleteCategoria(id);
	}

	public Categoria updateCategoria(Long id, Categoria categoria) {
			return cateservice.updateCategoria(id, categoria);
	}

	// fim Categoria

	// inicio Produto

		public Page<Produto> findAllProduto(Pageable pageable) {
			return prodservice.findAll(pageable);
		}

		public Produto findProdutoById(Long id) {
			return prodservice.findById(id);

		}

		public Produto saveProduto(Produto produto) {
			return prodservice.saveProduto(produto);
		}

		public void deleteProduto(Long id) {
			prodservice.deleteProduto(id);
		}

		public Produto updateProduto(Long id, Produto produto) {
				return prodservice.updateProduto(id, produto);
		}

		// fim Produto
}