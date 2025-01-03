import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from './Header';
import Cards from './Cards';
import List from './List';
import Email from './Email';
import Profile from './Profile';
import AddorEdit from './AddorEdit';
import 'bootstrap/dist/css/bootstrap.css';
import { useState,useEffect } from 'react';
import PhonebookServices from '../service/PhonebookServices';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter instead of Router

const Main = () => {

  //eslint-disable-next-line
  const [ contactInfo, setContactInfo ] = useState([]);

  useEffect(() => {
    PhonebookServices.getAllContacts()
    .then( (response) => {
      setContactInfo(response.data);
    })
    .catch( (error) => {
      console.error(error);
    });
  }, []);

  return (
    <Router>
      <Container className="mx-auto">
        {/* Define a route for the root path */}
        <Routes>
          <Route  path="/" element={
              <>
                <Header contactInfo={contactInfo} setContactInfo={setContactInfo} />
                <Cards contactInfo={contactInfo} setContactInfo={setContactInfo} />
              </>
            } />
          <Route
            path="/card" element={
              <>
                <Header contactInfo={contactInfo} setContactInfo={setContactInfo} />
                <Cards contactInfo={contactInfo} setContactInfo={setContactInfo} />
              </>
            } />
            <Route
            path="/list" element={
              <>
                <Header contactInfo={contactInfo} setContactInfo={setContactInfo} />
                <List contactInfo={contactInfo} setContactInfo={setContactInfo} />
              </>
            } />
          <Route path="/add/contact" element={<AddorEdit contactInfo={contactInfo} setContactInfo={setContactInfo} />} />
          <Route path="/edit/:id" element={<AddorEdit contactInfo={contactInfo} setContactInfo={setContactInfo} />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/mail/:id" element={<Email />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default Main
