// src/components/Reports.js
import React, { useState } from "react";
import { Button, Spinner } from 'react-bootstrap';
import { oauth2 as SMART } from "fhirclient";
const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGetReports = async () => {
    setLoading(true);
    setPdfUrl(null); // Reset PDF URL on new request

    try {
      // Fetch the access token from the SMART client
      const client = await SMART.ready();
      const token = client.state.tokenResponse.access_token;

      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8090/api/get-report', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        setPdfUrl(url);
      } else {
        console.error('Failed to fetch report, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleGetReports} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Get Reports'}
      </Button>
      {pdfUrl && (
        <div style={{ marginTop: '20px' }}>
          <iframe src={pdfUrl} width="100%" height="600px" title="Report" />
        </div>
      )}
    </div>
  );
};

export default Reports;
