package com.app.phonebook.controller;

import com.app.phonebook.exception.ResourceNotFoundException;
import com.app.phonebook.model.Phonebook;
import com.app.phonebook.repository.PhonebookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/phonebook")
public class PhonebookController {

    @Autowired
    PhonebookRepository phonebookRepository;

    @GetMapping
    public List<Phonebook> getAllContacts() {
        return phonebookRepository.findAll();
    }

    // Method to create a new contact with profile picture
    @PostMapping
    public Phonebook createContact(
            @RequestParam("name") String name,
            @RequestParam("phoneNo") long phoneNo,
            @RequestParam("email") String email,
            @RequestParam("address") String address,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("companyName") String companyName,
            @RequestParam("salary") int salary,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture) throws IOException {

        // Convert the file to byte array if present
        byte[] profilePicBytes = null;
        if (profilePicture != null) {
            profilePicBytes = profilePicture.getBytes();
        }

        Phonebook phonebook = new Phonebook();
        phonebook.setName(name);
        phonebook.setPhoneNo(phoneNo);
        phonebook.setEmail(email);
        phonebook.setAddress(address);
        phonebook.setJobTitle(jobTitle);
        phonebook.setCompanyName(companyName);
        phonebook.setSalary(salary);
        phonebook.setProfilePicture(profilePicBytes);

        return phonebookRepository.save(phonebook);
    }

    // Method to update an existing contact
    @PutMapping("{id}")
    public ResponseEntity<Phonebook> updateContact(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("phoneNo") long phoneNo,
            @RequestParam("email") String email,
            @RequestParam("address") String address,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("companyName") String companyName,
            @RequestParam("salary") int salary,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture) throws IOException {

        Phonebook existingContact = phonebookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact does not exist"));

        // Update the contact fields
        existingContact.setName(name);
        existingContact.setPhoneNo(phoneNo);
        existingContact.setEmail(email);
        existingContact.setAddress(address);
        existingContact.setJobTitle(jobTitle);
        existingContact.setCompanyName(companyName);
        existingContact.setSalary(salary);

        // If a new profile picture is uploaded, update it
        if (profilePicture != null) {
            existingContact.setProfilePicture(profilePicture.getBytes());
        }

        // Save the updated contact
        return ResponseEntity.ok(phonebookRepository.save(existingContact));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteContact(@PathVariable Long id) {
        Phonebook p1 = phonebookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact does not exist"));
        phonebookRepository.delete(p1);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{id}")
    public ResponseEntity<Phonebook> viewContact(@PathVariable Long id) {
        Phonebook p1 = phonebookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact does not exist"));

        // Convert the profile picture to base64 if present
        if (p1.getProfilePicture() != null) {
            String base64Image = Base64.getEncoder().encodeToString(p1.getProfilePicture());
            p1.setProfilePictureBase64(base64Image); // Set the base64 string here
            System.out.println("Profile Picture Base64: " + base64Image);  // Log Base64 string
        }

        return ResponseEntity.ok(p1);
    }
}
