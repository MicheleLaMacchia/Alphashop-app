package com.xantrix.webapp;

import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.xantrix.webapp.controller.ClientiController;
import com.xantrix.webapp.model.Cards;
import com.xantrix.webapp.model.Clienti;
import com.xantrix.webapp.service.ClientiService;

import reactor.core.publisher.Mono;

@WebFluxTest(ClientiController.class)
@TestMethodOrder(OrderAnnotation.class)
public class ClientiControllerUnitTest {

	@Autowired
	WebTestClient webTestClient;
	
	@MockBean
	private ClientiService clientiService;
	
	private Clienti createClienti() {
		Clienti cliente = new Clienti();
		cliente.setCodfid("65000000");
		cliente.setNominativo("Michele La Macchia");
		cliente.setIndirizzo("Viale Monza 12");
		cliente.setComune("Roma");
		cliente.setCap("00143");
		cliente.setProv("RM");
		cliente.setTelefono("3336517765");
		cliente.setMail("michele@tiscali.it");
		cliente.setAttivo(true);
		cliente.setDatacreazione(new Date());

		Cards card = new Cards();
		card.setBollini(500);
		card.setUltimaspesa(new Date());
		
		cliente.setCards(card);
		
		return cliente;
		
	}
	
	@Test
	@Order(1)
	public void testInsertCli() throws Exception{
		
		Clienti cliente = createClienti();
		
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
	public void testGetCliByCode() throws Exception{
		
		Clienti cliente = createClienti();
		
		Mono<Clienti> clientiMono = Mono.just(cliente);
		
		when(clientiService.SelByCodfid("65000000")).thenReturn(clientiMono);

		webTestClient.get()
			.uri("/api/clienti/cerca/codice/65000000")
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$").isNotEmpty()
			.jsonPath("$.codfid").isEqualTo("65000000")
			.jsonPath("$.nominativo").isEqualTo("Michele La Macchia")
			.jsonPath("$.indirizzo").isEqualTo("Viale Monza 12");
	}
	
}
