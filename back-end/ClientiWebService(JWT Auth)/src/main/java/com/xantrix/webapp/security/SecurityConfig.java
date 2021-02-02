package com.xantrix.webapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

import reactor.core.publisher.Mono;
 
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig 
{
	@Bean
	public BCryptPasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	};
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private SecurityContextRepository securityContextRepository;
	
	@Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) 
	{
		   final String[] USER_MATCHER = { "/api/clienti/cerca/**","/api/clienti/auth"};
	       final String[] ADMIN_MATCHER = { "/api/clienti/inserisci/**", "/api/clienti/elimina/**" };
	       
	       return http
	   			.exceptionHandling()
	   			.authenticationEntryPoint((swe, e) -> {
	   				return Mono.fromRunnable(() -> {
	   					swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
	   				});
	   			}).accessDeniedHandler((swe, e) -> {
	   				return Mono.fromRunnable(() -> {
	   					swe.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
	   				});
	   			}).and()
	   			.csrf().disable()
	   			.formLogin().disable()
	   			.httpBasic().disable()
	   			.authenticationManager(authenticationManager)
	   			.securityContextRepository(securityContextRepository)
	   			.authorizeExchange()
	   			.pathMatchers(HttpMethod.OPTIONS).permitAll()
	   			.pathMatchers(USER_MATCHER).hasAnyRole("USER")
                .pathMatchers(ADMIN_MATCHER).hasAnyRole("ADMIN")
	   			.anyExchange().authenticated()
	   			.and().build();
	       
	       /*
	       return http.authorizeExchange()
	    		    .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	                .pathMatchers(USER_MATCHER).hasAnyRole("USER")
	                .pathMatchers(ADMIN_MATCHER).hasAnyRole("ADMIN")
	                .anyExchange().permitAll()
	                .and().httpBasic()
	                .authenticationManager(authenticationManager)
	    			.securityContextRepository(securityContextRepository)
	                .and().csrf().disable()
	                .build();
	                */
	}
	
	/*
	 @Bean
	 public MapReactiveUserDetailsService userDetailsService() 
	 {
		 return new MapReactiveUserDetailsService(
	        		
             	User.builder() 
                     .username("Nicola")
                     .password(new BCryptPasswordEncoder().encode("123Stella"))
                     .roles("USER")
                     .build(),
                
                 User.builder() 
                     .username("Admin")
                     .password(new BCryptPasswordEncoder().encode("VerySecretPwd"))
                     .roles("USER","ADMIN")
                     .build());
	 }
	 */
	 
	
}
