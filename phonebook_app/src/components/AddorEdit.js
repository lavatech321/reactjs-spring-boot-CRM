import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PhonebookServices from '../service/PhonebookServices';

const AddorEdit = ({ contactInfo, setContactInfo }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phoneNo: '',
    email: '',
    address: '',
    jobTitle: '',
    companyName: '',
    salary: '',
    profilePicture: null, // Add a field for the profile picture
  });

  const [show, setShow] = useState(true);

  // Fetch contact details if editing
  useEffect(() => {
    if (id) {
      PhonebookServices.getContact(id)
        .then((response) => {
          setFormData(response.data);
          console.log('Fetched Contact:', response.data);
        })
        .catch((err) => {
          console.error('Error fetching contact:', err);
        });
    }
  }, [id]);

  const handleClose = () => {
    setShow(false);
    navigate('/'); // Navigate back after closing the modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setFormData({ ...formData, profilePicture: file });
  };

  const createOrEditContact = (e) => {
    e.preventDefault();
  
    // Validation checks
    if (!formData.name) {
      alert('Name is required');
      return;
    }
    if (!formData.phoneNo) {
      alert('Phone number is required');
      return;
    }
    if (!/^\d{10}$/.test(formData.phoneNo)) {
      alert('Invalid phone number');
      return;
    }
    if (!formData.email) {
      alert('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Email format is invalid');
      return;
    }
    if (!formData.address) {
      alert('Address is required');
      return;
    }
    if (!formData.jobTitle) {
      alert('Job title is required');
      return;
    }
    if (!formData.companyName) {
      alert('Company name is required');
      return;
    }
    if (!formData.salary) {
      alert('Salary is required');
      return;
    }
    if (!/^\d+$/.test(formData.salary)) {
      alert('Salary should contain only digits');
      return;
    }
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phoneNo', formData.phoneNo);
    data.append('email', formData.email);
    data.append('address', formData.address);
    data.append('jobTitle', formData.jobTitle);
    data.append('companyName', formData.companyName);
    data.append('salary', formData.salary);
    if (formData.profilePicture) {
      data.append('profilePicture', formData.profilePicture);
    }
  
    if (id) {
      PhonebookServices.updateContact(id, data)
        .then((response) => {
          setContactInfo((prevData) =>
            prevData.map((x) => (x.id === id ? { ...x, ...response.data } : x))
          );
          alert('Contact updated successfully');
          navigate('/');
        })
        .catch((err) => {
          console.error('Error updating contact:', err);
        });
    } else {
      PhonebookServices.createContact(data)
        .then((response) => {
          setContactInfo((prevData) => [...prevData, response.data]);
          alert('Contact created successfully');
          navigate('/');
        })
        .catch((err) => {
          console.error('Error creating contact:', err);
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{id ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createOrEditContact}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter Job Title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter Company Name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProfilePicture">
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => createOrEditContact(e)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddorEdit;
