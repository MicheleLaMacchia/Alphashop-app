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
public class ClientiServiceImpl implements ClientiService{

	@Autowired
	private ClientiRepository clientiRepository;
	
	@Override
	public Flux<Clienti> SelAll() {
		return clientiRepository.findAll();
	}

	@Override
	public Mono<Clienti> Salva(Clienti cliente) {
		return clientiRepository.save(cliente);
	}

	@Override
	public Mono<Void> Elimina(String id) {
		return clientiRepository.deleteById(id);
	}

	@Override
	public Mono<Clienti> SelByCodfid(String codfid) {
		return clientiRepository.findByCodfid(codfid);
	}

	@Override
	public Flux<Clienti> SelByNominativo(String nominativo) {
		return clientiRepository.findByNominativoLike(nominativo);
	}

	@Override
	public Flux<Clienti> SelByBollini(int bollini) {
		return clientiRepository.selByBollini(bollini);
	}

	@Override
	public Mono<Void> EliminaByCodfid(String codfid) {
		
	/*	
		Clienti cliente = new Clienti();
		
		clientiRepository.findByCodfid(codfid)
			.subscribe(p -> cliente.setId(p.getId()));
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		log.info("Id cliente: "+cliente.getId());
		
		return clientiRepository.deleteById(cliente.getId());
	*/
		return clientiRepository.findByCodfid(codfid)
				.filter(c -> c!= null)
				.flatMap(c -> clientiRepository.deleteById(c.getId()))
				.then();
	}

}
