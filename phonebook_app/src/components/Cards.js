import React from "react";
import { Badge, Row, Col, Card, Dropdown, Button } from "react-bootstrap"; // Import necessary components
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "../index.css";
import PhonebookServices from "../service/PhonebookServices";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Cards({ contactInfo, setContactInfo }) {
  useEffect(() => {
    PhonebookServices.getAllContacts()
      .then((response) => {
        setContactInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setContactInfo]);

  const deleteContact = (id) => {
    PhonebookServices.deleteContact(id)
      .then((response) => {
        setContactInfo((prevData) =>
          prevData.filter((contact) => contact.id !== id)
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <Row>
      {contactInfo.map((contact) => (
        <Col xs="6" xl="3">
          <Card className="mb-3">
            <Card.Body className="position-relative">
              {/* Dropdown using React Bootstrap */}
              <Dropdown className="float-end">
                <Dropdown.Toggle variant="muted" id="dropdown-basic">
                  <i className="bx bx-dots-horizontal-rounded"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item as={Link} to={`/edit/${contact.id}`}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteContact(contact.id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div className="d-flex align-items-center">
                <img
                  src={`data:image/jpeg;base64,${contact.profilePicture}`}
                  alt={contact.name}
                  className="rounded-circle img-thumbnail"
                  style={{ width: "4rem", height: "4rem" }} // Resizing the image
                />
                <div className="flex-1 ms-3">
                  <h5 className="font-size-16 mb-1">
                    <a href={`/profile/${contact.id}`} className="text-dark">
                      {contact.name}
                    </a>
                  </h5>
                  <Badge pill bg="success" className="mb-0">
                    {contact.jobTitle}
                  </Badge>
                  {/* Use Badge component */}
                </div>
              </div>
              <div className="mt-3 pt-1">
                <p className="text-muted mb-0 d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-telephone"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                  </svg>
                  <span className="m-2">{contact.phoneNo}</span>
                </p>
                <p className="text-muted mb-0 d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-3"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                  <a
                    href={`/mail/${contact.id}`}
                    className="m-2 __cf_email__"
                    data-cfemail="b9f3d8d4dccaf7d0c1f9cac9c097dad6d4"
                  >
                    [ {contact.email} ]
                  </a>
                </p>
                <p className="text-muted mb-0 d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    className="me-3"
                    height="16"
                    fill="currentColor"
                    class="bi bi-house"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                  </svg>
                  <span className="m-2">{contact.address}</span>
                </p>
              </div>
              <div className="d-flex gap-5 pt-4">
                <Button variant="muted" className="d-flex align-items-center"
                as={Link}  to={`/profile/${contact.id}`}  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                  <span className="mx-2" >Profile</span>
                </Button>
                <Button variant="success" className="d-flex align-items-center"
                  onClick={() => window.open(`https://web.whatsapp.com/send?phone=${contact.phoneNo}`, '_blank')}
                  >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-2 bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                  Watsap
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Cards;
