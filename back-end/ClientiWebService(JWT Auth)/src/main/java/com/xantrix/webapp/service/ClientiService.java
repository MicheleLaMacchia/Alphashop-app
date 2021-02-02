package com.xantrix.webapp.service;

import com.xantrix.webapp.model.Clienti;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ClientiService 
{
	public Flux<Clienti> SelAll();
	
	public Mono<Clienti> SelByCodFid(String CodFid);
	
	public Flux<Clienti> SelByNominativo(String Nominativo);
	
	public Flux<Clienti> SelByBollini(int Bollini);
	
	public Mono<Clienti> Salva(Clienti cliente);
	
	public Mono<Void> Elimina(String Id);
	
	public Mono<Void> EliminaByCodFid(String CodFid);
	 
	
}
 