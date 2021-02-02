package com.xantrix.webapp.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.xantrix.webapp.model.Clienti;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ClientiRepository extends ReactiveMongoRepository<Clienti, String> //ReactiveCrudRepository<Clienti, String> 
{
	public Mono<Clienti> findByCodfid(String CodFid);
	
	public Flux<Clienti> findByNominativoLike(String Descrizione);
	
	@Query("{ 'cards.bollini': {$gt:?0}  }")
	public Flux<Clienti> selByBollini(int Bollini);
}
