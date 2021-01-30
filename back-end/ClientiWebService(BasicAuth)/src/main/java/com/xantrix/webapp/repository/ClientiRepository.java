package com.xantrix.webapp.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.xantrix.webapp.model.Clienti;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

// ReactiveCrudRepository<Clienti, String> è generica per qualsiasi NOSQL, va bene anche per il Mongo
public interface ClientiRepository extends ReactiveMongoRepository<Clienti, String>
{
	public Mono<Clienti> findByCodfid(String codfid);
	
	public Flux<Clienti> findByNominativoLike(String nominativo);
	
	@Query("{ 'cards.bollini': {$gt:?0} }")
	public Flux<Clienti> selByBollini(int bollini);
	
}
