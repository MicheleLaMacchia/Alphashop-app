package com.xantrix.webapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.xantrix.webapp.controller.SalutiController;

@SpringBootTest
class SalutiWebServiceApplicationTests {
	
	WebTestClient testClient;

	private void initTestController() {
		testClient = WebTestClient
				.bindToController(new SalutiController())
				.build();
	}

	@Test
	void contextLoads() {
		
		this.initTestController();

		testClient.get().uri("/api/saluti")
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$").isNotEmpty()
			.jsonPath("$").isEqualTo("Piacere, sono un web service");
	}
	
	@Test
	void testSaluti2() {
		
		this.initTestController();

		testClient.get().uri("/api/saluti/Michele")
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$").isNotEmpty()
			.jsonPath("$").isEqualTo("Piacere Michele, ti saluto");
	}

}
