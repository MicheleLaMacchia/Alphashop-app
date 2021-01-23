package com.xantrix.webapp.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import com.xantrix.webapp.model.Clienti;

// ReactiveCrudRepository<Clienti, String> è generica per qualsiasi NOSQL, va bene anche per il Mongo
public interface ClientiRepository extends ReactiveMongoRepository<Clienti, String>
{
	
}
