import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap'; // Import necessary components
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import '../index.css';
import PhonebookServices from '../service/PhonebookServices';
import { Link } from 'react-router-dom';

function List({ contactInfo, setContactInfo }) {
    useEffect(() => {
        PhonebookServices.getAllContacts()
            .then((response) => {
                setContactInfo(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [setContactInfo]);

    const deleteContact = (id) => {
        PhonebookServices.deleteContact(id)
            .then(() => {
                setContactInfo((prevData) => prevData.filter((contact) => contact.id !== id));
            })
            .catch((err) => console.error(err));
    };

    return (
        <Row>
            {contactInfo.map((contact) => (
                <Col xs="12" className="mb-3" key={contact.id}>
                    <div className="d-flex justify-content-between align-items-center p-3 border rounded">
                        <div>
                            <h5 className="mb-1">{contact.name}</h5>
                            <p className="mb-0 text-muted">{contact.jobTitle}</p>
                        </div>
                        <div>
                            <Button
                                variant="primary"
                                size="sm"
                                as={Link}
                                to={`/edit/${contact.id}`}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => deleteContact(contact.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
}

export default List;
