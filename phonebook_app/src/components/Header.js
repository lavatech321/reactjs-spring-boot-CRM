import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, useLocation} from 'react-router-dom';
import {useState} from 'react';

const Header = ({contactInfo,setContactInfo}) => {

  const location = useLocation();
  const [viewMode, setViewMode] = useState(location.pathname); // 'list' or 'card'

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  return (
    <div>
      <Row xs="8" className="mt-5">
      <Col>
        <h5 >Contact List <span className="text-muted fw-normal ms-2">({contactInfo.length})</span></h5>
      </Col>
      <Col>
      <div class="d-flex flex-wrap align-items-center justify-content-end mb-3">


      {/* List button icon */}
      <Button variant={viewMode === '/list' ? 'primary' : 'outline-primary'} className="d-flex align-items-center mx-3" 
        onClick={() => handleToggleView('/list')} as={Link} to="/list" >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
        <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
      </svg>
      </Button>


      {/* card button icon */}
      <Button variant={viewMode === '/card' ? 'primary' : 'outline-primary'} className="d-flex align-items-center mx-3"
                      onClick={() => handleToggleView('/card') } as={Link} to="/card"
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-vcard-fill" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
      </svg>
      </Button>


        <Button variant="primary" className="d-flex align-items-center" as={Link} to="/add/contact" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
          Add Contact
        </Button>
      </div>
      </Col>
      </Row>


    </div>
  )
}

export default Header
