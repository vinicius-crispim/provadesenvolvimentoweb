package com.web.prova.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.web.prova.entities.Carro;
import com.web.prova.entities.Marca;
import com.web.prova.facade.CarroFacade;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

	@Autowired
	private CarroFacade carrofacade;

	@Override
	public void run(String... args) throws Exception {
		Marca m1 = new Marca();
		m1.setNome("Hyundai");
		Marca m2 = new Marca();
		m2.setNome("Fiat");
		Marca m3 = new Marca();
		m3.setNome("Chevrolet");
		carrofacade.saveMarca(m1);
		carrofacade.saveMarca(m2);
		carrofacade.saveMarca(m3);
		
		Carro c1 = new Carro();
		c1.setMarca(m1);
		c1.setNome("Hyundai Creta");
		c1.setPreço(50500.0);
		c1.setStatus("Inativo");
		Carro c2 = new Carro();
		c2.setMarca(m1);
		c2.setNome("Hyundai HB20");
		c2.setPreço(75000.0);
		c2.setStatus("Ativo");
		Carro c10 = new Carro();
		c10.setMarca(m2);
		c10.setNome("Fiat Argo");
		c10.setPreço(50500.0);
		c10.setStatus("Inativo");
		Carro c20 = new Carro();
		c20.setMarca(m2);
		c20.setNome("Fiat Dobló");
		c20.setPreço(75000.0);
		c20.setStatus("Ativo");
		Carro c3 = new Carro();
		c3.setMarca(m3);
		c3.setNome("Chevette");
		c3.setPreço(25000.0);
		c3.setStatus("Ativo");
		carrofacade.saveCarro(c1);
		carrofacade.saveCarro(c2);
		carrofacade.saveCarro(c3);
		carrofacade.saveCarro(c20);
		carrofacade.saveCarro(c10);
	}
}