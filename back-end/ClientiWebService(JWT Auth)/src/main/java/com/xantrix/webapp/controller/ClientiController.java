package com.xantrix.webapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins="http://localhost:3000")
public class ClientiController 
{
	@Autowired
	ClientiService clientiService;
	
	@PostMapping(value = "/inserisci", produces = "application/json")
	public ResponseEntity<Mono<Clienti>> insertCli(@RequestBody Clienti NewCliente) 
	{
		log.info("****** Inserimento Dati Cliente *******");
		
		Mono<Clienti> Cliente = clientiService.Salva(NewCliente)
				.onErrorMap(ex -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Errore Inserimento Clienti"));
		
		return new ResponseEntity<Mono<Clienti>>(Cliente, HttpStatus.CREATED);
	}
	
	@DeleteMapping(value = "/elimina/{id}", produces = "application/json")
	public ResponseEntity<Mono<Void>> deleteCli(@PathVariable("id") String Id) 
	{
		log.info("****** Eliminazione Dati Cliente *******");
		
		return new ResponseEntity<Mono<Void>>(clientiService.Elimina(Id), HttpStatus.OK);
	}
	
	// ------------------- ELIMINAZIONE CLIENTE ------------------------------------
	@DeleteMapping(value = "/elimina/codfid/{CodFid}", produces = "application/json")
	public ResponseEntity<Mono<Void>> deleteCliByCodFid(@PathVariable("CodFid") String CodFid) 
	{
		log.info("****** Eliminazione Dati Cliente Per CodFid *******");
		
		return new ResponseEntity<Mono<Void>>(clientiService.EliminaByCodFid(CodFid), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/cerca/all", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Flux<Clienti>> listAllCli()
	{
		log.info("****** Otteniamo tutti i clienti in anagrafica *******");
		
		Flux<Clienti> clienti = clientiService.SelAll()
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Non è stato trovato alcun cliente!")));
		
		return new ResponseEntity<Flux<Clienti>>(clienti, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/cerca/codice/{codfid}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Mono<Clienti>> getCliByCode(@PathVariable("codfid") String CodFid) 
			throws Exception  
	{
		log.info("****** Otteniamo il cliente con codice " + CodFid + " *******");

		Mono<Clienti> cliente = clientiService.SelByCodFid(CodFid)
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Non è stato trovato alcun cliente!")));

		return new ResponseEntity<Mono<Clienti>>(cliente, HttpStatus.OK);
	}
	
	// ------------------- Ricerca Clienti x Nominativo ------------------------------------
	@GetMapping(value = "/cerca/nominativo/{filter}", produces = "application/json")
	public ResponseEntity<Flux<Clienti>> listCliByName(@PathVariable("filter") String Filtro)
			throws Exception  
	{
		log.info("****** Otteniamo tutti i clienti in anagrafica *******");

		Flux<Clienti> clienti = clientiService.SelByNominativo(Filtro)
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Non è stato trovato alcun cliente!")));
		
		return new ResponseEntity<Flux<Clienti>>(clienti, HttpStatus.OK);
	}
	
	// ------------------- Ricerca x Bollini ------------------------------------
	@GetMapping(value = "/cerca/bollini/{filter}", produces = "application/json")
	public ResponseEntity<Flux<Clienti>> listByBollini(@PathVariable("filter") int Bollini)
			throws Exception  
	{
		log.info("****** Otteniamo tutti i clienti per monte bollini *******");

		Flux<Clienti> clienti = clientiService.SelByBollini(Bollini)
				.switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "Non è stato trovato alcun cliente!")));
		
		return new ResponseEntity<Flux<Clienti>>(clienti, HttpStatus.OK);
	}
}










