package com.app.phonebook;

import com.app.phonebook.model.Phonebook;
import com.app.phonebook.repository.PhonebookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class PhonebookApplication implements CommandLineRunner {

	@Autowired
	PhonebookRepository phonebookRepository;
	public static void main(String[] args) {
		SpringApplication.run(PhonebookApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Phonebook p1 = new Phonebook();
		p1.setAddress("Pune");
		p1.setEmail("raman@gmail.com");
		p1.setName("Raman Verma");
		p1.setCompanyName("TCS");
		p1.setSalary(12000);
		p1.setPhoneNo(1231231231L);
		p1.setJobTitle("Software Developer");
		// Load the image as a byte array
		// Load the image as a byte array
		Path imagePath = Paths.get(ResourceUtils.getFile("classpath:static/images/spring.png").toURI());
		byte[] imageBytes = Files.readAllBytes(imagePath);

		// Set the image data to the profilePicture field
		p1.setProfilePicture(imageBytes);
		phonebookRepository.save(p1);
	}
}