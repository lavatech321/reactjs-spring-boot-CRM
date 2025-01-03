package com.app.phonebook.repository;

import com.app.phonebook.model.Phonebook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhonebookRepository extends JpaRepository<Phonebook, Long> {
}
