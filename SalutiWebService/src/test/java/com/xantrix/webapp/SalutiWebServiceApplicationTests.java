package com.xantrix.webapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.xantrix.webapp.controller.SalutiController;

@SpringBootTest
class SalutiWebServiceApplicationTests {

	@Test
	void contextLoads() {
		WebTestClient testClient = WebTestClient.bindToController(
				new SalutiController())
				.build();
				
		testClient.get().uri("/api/saluti")
		.exchange()
		.expectStatus().isOk()
		.expectBody()
		.jsonPath("$").isNotEmpty()
		.jsonPath("$").isEqualTo("Piacere, sono un web service");
	}

}
