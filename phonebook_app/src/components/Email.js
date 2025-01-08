import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";
import PhonebookServices from "../service/PhonebookServices";
import emailjs from "@emailjs/browser";

function Email() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [emailData, setEmailData] = useState({
    to: '',
    from: 'lavatech.training@gmail.com',
    subject: '',
    body: '',
  });

  const handleClose = () =>  {
    setShow(false);
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email Data Submitted:", emailData);
    navigate("/");
    handleClose();
  };

  useEffect(() => {
    if (id) {
      PhonebookServices.getContact(id)
        .then((response) => {
          console.log(response.data);
          setEmailData((prevData) => ({
            ...prevData,
            to: response.data.email,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const sendEmail = (e) => {
    e.preventDefault();
    const { to, from, subject, body } = emailData;
    if ( !to || !from || !subject || !body ) {
      console.log("To:",to, " From:", from, " Subject:" , subject, " Body:" , body);
      alert("Please fill out all fields!");
      return;
    }
    const templateParams = {
      to_email: to,
      from_email: from,
      subject: subject,
      body: body,
    };
    emailjs
      .send(
        "service_36e8q71",
        "template_eltn72b",
        templateParams,
        "xNH6GnaGIf8F5l8Iz"
      )
      .then(
        (response) => {
          alert("Email sent successfully!");
          navigate("/");
        },
        (error) => {
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="custom-modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                name="to"
                placeholder="Recipient's Email"
                value={emailData.to}
                onChange={ handleChange }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="email"
                name="from"
                placeholder="Your Email"
                value={emailData.from}
                onChange={ handleChange }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Email Subject"
                value={emailData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                rows={5}
                placeholder="Write your message here"
                value={emailData.body}
                onChange={ handleChange }
                required
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              onClick={(e) => sendEmail(e)}
            >
              Send Email
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Email;
