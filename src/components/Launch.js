// src/components/Launch.js
import { useEffect } from "react";
import { oauth2 as SMART } from "fhirclient";

const Launch = () => {
  useEffect(() => {
    SMART.authorize({
      clientId: "b90e1c6f-329e-4a39-b4e3-638c93acbf58",
      scope: "launch openid fhirUser patient/*.read patient/MedicationRequest.read patient/*.search",
      redirectUri: "http://localhost:8080/",
      //pkceMode:true,
    });
  }, []);

  return <div>Launching...</div>;
};

export default Launch;

