package com.web.prova.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.web.prova.entities.Categoria;
import com.web.prova.entities.Produto;
import com.web.prova.facade.ProdutoFacade;

@Configuration
@Profile ("test")
public class TestConfig implements  CommandLineRunner{
	
    @Autowired 
    private ProdutoFacade produtofacade;
   
    

    @Override
	public void run(String... args) throws Exception {
    	Categoria cate1 = new Categoria();
    	cate1.setNome("Tecnologia");
    	Categoria cate2 = new Categoria();
    	cate2.setNome("Materiais de Escritório");
    	Categoria cate3 = new Categoria();
    	cate3.setNome("Acessórios para Escritório");
    	produtofacade.saveCategoria(cate1);
    	produtofacade.saveCategoria(cate2);
    	produtofacade.saveCategoria(cate3);
    	Produto p = new Produto();
        p.setNome("Monitor");
        p.setDescrição("Monitor para computador");
        p.setQuantidademin(5);
        p.setEstoque(13);
        p.setCategoria(cate1);
       
        Produto p2 = new Produto();
        p2.setNome("Agenda");
        p2.setDescrição("Agenda para marcar seus compromissos");
        p2.setQuantidademin(11);
        p2.setEstoque(35);
        p2.setCategoria(cate2);
        Produto p3 = new Produto();
        p3.setNome("Post-it");
        p3.setDescrição("Post-it para anotar lembretes e colar");
        p3.setQuantidademin(20);
        p3.setEstoque(52);
        p3.setCategoria(cate2);
        Produto p4 = new Produto();
        p4.setNome("Calendário");
        p4.setDescrição("Calendário para visualizar as datas");
        p4.setQuantidademin(8);
        p4.setEstoque(11);
        p4.setCategoria(cate3);
        Produto p5 = new Produto();
        p5.setNome("Teclado");
        p5.setDescrição("Teclado para utilizar no computador");
        p5.setQuantidademin(4);
        p5.setEstoque(9);
        p5.setCategoria(cate1);
        Produto p6 = new Produto();
        p6.setNome("Mouse");
        p6.setDescrição("Mouse para utilizar computador");
        p6.setQuantidademin(8);
        p6.setEstoque(24);
        p6.setCategoria(cate1);
       
        Produto p7 = new Produto();
        p7.setNome("Caderno");
        p7.setDescrição("Caderno para anotações");
        p7.setQuantidademin(21);
        p7.setEstoque(75);
        p7.setCategoria(cate2);
        Produto p8 = new Produto();
        p8.setNome("Caneta Azul");
        p8.setDescrição("Caneta para escrever");
        p8.setQuantidademin(20);
        p8.setEstoque(80);
        p8.setCategoria(cate2);
        Produto p9 = new Produto();
        p9.setNome("Clipes");
        p9.setDescrição("Clipes para juntar folhas");
        p9.setQuantidademin(25);
        p9.setEstoque(110);
        p9.setCategoria(cate3);
        Produto p1 = new Produto();
        p1.setNome("HD");
        p1.setDescrição("HD para usar nos computadores");
        p1.setQuantidademin(6);
        p1.setEstoque(12);
        p1.setCategoria(cate1);
        produtofacade.saveProduto(p);
        produtofacade.saveProduto(p2);
        produtofacade.saveProduto(p3);
        produtofacade.saveProduto(p4);
        produtofacade.saveProduto(p5);
        produtofacade.saveProduto(p1);
        produtofacade.saveProduto(p6);
        produtofacade.saveProduto(p7);
        produtofacade.saveProduto(p8);
        produtofacade.saveProduto(p9);
    }
}