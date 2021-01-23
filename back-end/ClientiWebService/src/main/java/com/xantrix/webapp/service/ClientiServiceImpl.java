package com.xantrix.webapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xantrix.webapp.model.Clienti;
import com.xantrix.webapp.repository.ClientiRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ClientiServiceImpl implements ClientiService{

	@Autowired
	private ClientiRepository clientiRepository;
	
	@Override
	public Flux<Clienti> SelAll() {
		return clientiRepository.findAll();
	}

	@Override
	public Mono<Clienti> Salva(Clienti cliente) {
		return clientiRepository.insert(cliente);
	}

	@Override
	public Mono<Void> Elimina(String id) {
		return clientiRepository.deleteById(id);
	}

}
