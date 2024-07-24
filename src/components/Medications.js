// src/components/Medications.js
import React, { useEffect, useState } from "react";
import { oauth2 as SMART } from "fhirclient";

const Medications = ({ patientId }) => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    if (patientId) {
      SMART.ready().then((client) => {
        client.request(`MedicationRequest?patient=${patientId}`).then(
          (response) => {
            setMedications(response.entry || []);
          },
          (error) => console.error(error)
        );
      });
    }
  }, [patientId]);

  return (
    <div>
      <h4>Medications</h4>
      {medications.length === 0 ? (
        <p>No medications found.</p>
      ) : (
        <ul>
          {medications.map((entry, index) => (
            <li key={index}>
              {entry.resource.medicationCodeableConcept?.text || 'Unknown medication'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Medications;
