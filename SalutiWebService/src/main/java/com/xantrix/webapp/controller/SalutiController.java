package com.xantrix.webapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/saluti")
public class SalutiController {

	@GetMapping
	public String getSaluti() 
	{
		return "Piacere, sono un web service";
	}
}
