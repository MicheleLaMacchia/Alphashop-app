package com.xantrix.webapp;

import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.xantrix.webapp.controller.ClientiController;
import com.xantrix.webapp.model.Cards;
import com.xantrix.webapp.model.Clienti;
import com.xantrix.webapp.service.ClientiService;

import reactor.core.publisher.Mono;

@WebFluxTest(ClientiController.class)
@TestMethodOrder(OrderAnnotation.class)
public class ClientiControllerUnitTest 
{
	@Autowired
    WebTestClient webTestClient;
	
	@MockBean
	private ClientiService clientiService;
	
	private Clienti createClienti()
	{
		Clienti cliente = new Clienti();
		cliente.setCodfid("65000000");
		cliente.setNominativo("Nicola La Rocca"); 
		cliente.setIndirizzo("P.zza giovanni XXIII");
		cliente.setComune("Alghero");
		cliente.setCap("07041");
		cliente.setProv("SS");
		cliente.setTelefono("0031259856");
		cliente.setMail("test@tiscali.it");
		cliente.setAttivo(true);
		cliente.setDatacreazione(new Date());
		
		Cards card = new Cards();
		card.setBollini(500);  
		card.setUltimaspesa("2020-01-15");
		
		cliente.setCards(card);
		
		return cliente;
	}
	
	@Test
	@Order(1)
	public void testInsertCli() throws Exception
	{
		Clienti cliente = this.createClienti();
		
		Mono<Clienti> clientiMono = Mono.just(cliente);
		
		when(clientiService.Salva(cliente)).thenReturn(clientiMono);
		
		webTestClient.post()
		  .uri("/api/clienti/inserisci")
		  .contentType(MediaType.APPLICATION_JSON)
          .accept(MediaType.APPLICATION_JSON)
          .body(clientiMono, Clienti.class)
          .exchange()
          .expectStatus().isCreated();
	
	}
	
	@Test
	@Order(2)
	void testGetCliByCode() 
	{
		Clienti cliente = this.createClienti();
		
		Mono<Clienti> clientiMono = Mono.just(cliente);
		
		when(clientiService.SelByCodFid("65000000")).thenReturn(clientiMono);
		
		webTestClient.get()
			.uri("/api/clienti/cerca/codice/65000000")
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$").isNotEmpty()
			.jsonPath("$.codfid").isEqualTo("65000000")
			.jsonPath("$.nominativo").isEqualTo("Nicola La Rocca")
			.jsonPath("$.indirizzo").isEqualTo("P.zza giovanni XXIII");
		
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
}
