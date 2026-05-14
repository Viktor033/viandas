package com.manoplas.viandas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.springframework.context.annotation.ComponentScan(basePackages = "com.manoplas.viandas")
public class ViandasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ViandasApplication.class, args);
	}

}
