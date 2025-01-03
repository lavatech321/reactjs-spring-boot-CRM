package com.app.phonebook.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phonebook_table")
public class Phonebook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Lob // Marks this as a large object (binary or text)
    @Column(name = "profile_picture", columnDefinition = "LONGBLOB") // Specifies LONGBLOB type explicitly
    private byte[] profilePicture; // To store the binary data of the image

    @Transient // This field will not be saved in the database
    private String profilePictureBase64; // To hold the base64 string for frontend use

    private String name;
    private long phoneNo;
    private String email;
    private String address;
    private String jobTitle;
    private String companyName;
    private int salary;

    // Getters and setters for all fields including the new profilePictureBase64 field
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getProfilePictureBase64() {
        return profilePictureBase64;
    }

    public void setProfilePictureBase64(String profilePictureBase64) {
        this.profilePictureBase64 = profilePictureBase64;
    }

    // Other getters and setters...
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(long phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
}
