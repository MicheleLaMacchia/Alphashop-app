package com.xantrix.webapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xantrix.webapp.model.Clienti;
import com.xantrix.webapp.repository.ClientiRepository;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ClientiServiceImpl  implements ClientiService
{

	@Autowired
	ClientiRepository clientiRepository;
	
	@Override
	public Flux<Clienti> SelAll() 
	{
		return clientiRepository.findAll();
	}

	@Override
	public Mono<Clienti> Salva(Clienti cliente) 
	{
		return clientiRepository.save(cliente);
	}

	@Override
	public Mono<Void> Elimina(String Id) 
	{
		return clientiRepository.deleteById(Id);
	}

	@Override
	public Mono<Clienti> SelByCodFid(String CodFid) 
	{
		 
		return clientiRepository.findByCodfid(CodFid);
	}

	@Override
	public Flux<Clienti> SelByNominativo(String Nominativo) 
	{
		return clientiRepository.findByNominativoLike(Nominativo);
	}

	@Override
	public Flux<Clienti> SelByBollini(int Bollini) 
	{
		return clientiRepository.selByBollini(Bollini);
	}

	@Override
	public Mono<Void> EliminaByCodFid(String CodFid) 
	{
	
		Clienti cliente = new Clienti();
		
		clientiRepository.findByCodfid(CodFid)
			.subscribe(p -> cliente.setId(p.getId()));
		
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			 
			e.printStackTrace();
		}
		
		log.info("Id: " + cliente.getId());
		
		return clientiRepository.deleteById(cliente.getId()); 
	}
	
	
	
	
	
	
	
	
	
	

}
