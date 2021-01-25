package com.xantrix.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.xantrix.webapp.model.Clienti;
import com.xantrix.webapp.service.ClientiService;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/clienti")
@Slf4j
public class ClientiController 
{
	
	@Autowired
	private ClientiService clientiService;

	@PostMapping(value = "/inserisci", produces = "application/json")
	public ResponseEntity<Mono<Clienti>> insertCli(@RequestBody Clienti newCliente ) {
		log.info("******** Inserimento dati cliente *********");
		
		Mono<Clienti> cliente = clientiService.Salva(newCliente);
		
		return new ResponseEntity<Mono<Clienti>>(cliente, HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/cerca/all", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Flux<Clienti>> listAllCli() {
		log.info("******** Otteniamo tutti i clienti *********");
		
		Flux<Clienti> clienti = clientiService.SelAll()
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND,
						"Non è stato tovato alcun cliente!")));
		
		return new ResponseEntity<Flux<Clienti>>(clienti, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/elimina/{id}", produces = "application/json")
	public ResponseEntity<Mono<Void>> deleteCli(@PathVariable("id") String id) {
		log.info("******** Eliminiamo il cliente con id: "+id+" *********");
		
		Mono<Void> res = clientiService.Elimina(id);
		
		return new ResponseEntity<Mono<Void>>(res, HttpStatus.OK);
	}
	
	@GetMapping(value = "/cerca/codice/{codfid}", produces = "application/json")
	public ResponseEntity<Mono<Clienti>> getCliByCode(@PathVariable("codfid") String codfid) {
		log.info("******** Cerca il cliente avente codfid: "+codfid+" *********");
		
		Mono<Clienti> res = clientiService.SelByCodfid(codfid)
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, 
						"Non è stato trovato nessun cliente con codfid: "+codfid)));
		
		return new ResponseEntity<Mono<Clienti>>(res, HttpStatus.OK);
	}
	
	@GetMapping(value = "/cerca/nominativo/{filter}", produces = "application/json")
	public ResponseEntity<Flux<Clienti>> listCliByName(@PathVariable("filter") String filtro) {
		log.info("******** Cerca i clienti per nominativo *********");
		
		Flux<Clienti> res = clientiService.SelByNominativo(filtro)
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, 
						"Non è stato trovato nessun cliente con nominativo: "+filtro)));
		
		return new ResponseEntity<Flux<Clienti>>(res, HttpStatus.OK);
	}
	
	@GetMapping(value = "/cerca/bollini/{filter}", produces = "application/json")
	public ResponseEntity<Flux<Clienti>> listCliByBollini(@PathVariable("filter") int filtro) {
		log.info("******** Cerca i clienti per monte bollini *********");
		
		Flux<Clienti> res = clientiService.SelByBollini(filtro)
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, 
						"Non è stato trovato nessun cliente con monte bollini: "+filtro)));
		
		return new ResponseEntity<Flux<Clienti>>(res, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/elimina/codfid/{codfid}", produces = "application/json")
	public ResponseEntity<Mono<Void>> deleteCliByCodfid(@PathVariable("codfid") String codfid) {
		log.info("******** Eliminiamo il cliente codfid: "+codfid+" *********");
		
		Mono<Void> res = clientiService.EliminaByCodfid(codfid);
		
		return new ResponseEntity<Mono<Void>>(res, HttpStatus.OK);
	}
	
}


