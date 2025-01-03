import React, { useState, useEffect } from "react";
import { Badge, Button, Modal, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import PhonebookServices from "../service/PhonebookServices";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    id: "",
    name: "",
    phoneNo: "",
    email: "",
    address: "",
    jobTitle: "",
    companyName: "",
    salary: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (id) {
      PhonebookServices.getContact(id)
        .then((response) => {
          setContact(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    navigate("/card");
  }
    

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card
            style={{
              width: "100%",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "15px",
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)", // 3D shadow effect
              transition: "transform 0.2s", // Add smooth hover animation
            }}
            className="hover-card"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src={`data:image/jpeg;base64,${contact.profilePicture}`}
                alt={contact.name}
                className="rounded-circle img-thumbnail"
                style={{
                  width: "15rem",
                  height: "15rem",
                  border: "5px solid #f8f9fa",
                  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)", // 3D effect for image
                }}
              />
            </div>
            <Card.Body>
              <Card.Title
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {contact.name}
              </Card.Title>
              <Card.Text style={{ textAlign: "center", marginBottom: "1rem" }}>
                <Badge
                  pill
                  bg="success"
                  style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
                >
                  {contact.jobTitle}
                </Badge>
              </Card.Text>
            </Card.Body>
            <Card.Text className="ms-3 my-2">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px auto",
                  rowGap: "8px",
                }}
              >
                <div>
                  <strong>Phone:</strong>
                </div>
                <div>{contact.phoneNo}</div>
                <div>
                  <strong>Email:</strong>
                </div>
                <div>{contact.email}</div>
                <div>
                  <strong>Address:</strong>
                </div>
                <div>{contact.address}</div>
                <div>
                  <strong>Company:</strong>
                </div>
                <div>{contact.companyName}</div>
                <div>
                  <strong>Salary:</strong>
                </div>
                <div>${contact.salary}</div>
              </div>
            </Card.Text>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
