// src/App.js
import React, { useEffect, useState } from "react";
import { oauth2 as SMART } from "fhirclient";
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import Medications from "./components/Medications";
import Reports from "./components/Reports";
import './App.css';

const App = () => {
  const [patient, setPatient] = useState(null);
  const [key, setKey] = useState('medications');

  useEffect(() => {
    SMART.ready().then((client) => {
      client.patient.read().then(
        (pt) => {
          const patientInfo = {
            id: pt.id,
            name: pt.name?.[0]?.text || `${pt.name?.[0]?.given?.join(' ')} ${pt.name?.[0]?.family}`,
            address: pt.address?.[0]?.text || `${pt.address?.[0]?.line?.join(', ')} ${pt.address?.[0]?.city}, ${pt.address?.[0]?.state} ${pt.address?.[0]?.postalCode}`,
            birthDate: pt.birthDate,
          };
          setPatient(patientInfo);
        },
        (error) => setPatient({ error: error.stack })
      );
    });
  }, []);

  return (
    <Container className="container">
      <Row>
        <Col>
          <h4>Current Patient</h4>
          {patient ? (
            patient.error ? (
              <div className="error">{patient.error}</div>
            ) : (
              <div className="patient-details">
                <div><strong>Name:</strong> {patient.name}</div>
                <div><strong>Address:</strong> {patient.address}</div>
                <div><strong>Date of Birth:</strong> {patient.birthDate}</div>
              </div>
            )
          ) : (
            <div className="loading">Loading...</div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs
            id="patient-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="medications" title="Medications">
              <Medications patientId={patient?.id} />
            </Tab>
            <Tab eventKey="reports" title="Reports">
              <Reports />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
