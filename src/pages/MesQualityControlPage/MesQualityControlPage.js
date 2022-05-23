import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

import EmailSectionComponent from "../../components/EmailSectionComponent/EmailSectionComponent";
import { BASE_URL } from "../../services/CONSTANTS";
import { TitleContext } from "../../App";
import httpResponseHandler from "../../services/httpResponseHandler";
import statementEvent from "../../services/statementEvent";

const MesQualityControlPage = () => {
  const { setTitle } = useContext(TitleContext);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    setTitle("MES - Kontrola jakości");
    getEmailsRequest();
  }, []);

  const getEmailsRequest = () => {
    axios
      .get(`${BASE_URL}/quality-controls`)
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        httpResponseHandler(error);
      });
  };

  const addNewEmailRequest = (email, productType) => {
    const body = { email, productType };
    axios
      .post(`${BASE_URL}/quality-controls`, body)
      .then((response) => {
        statementEvent.next({
          isError: false,
          content: `Email: ${email} został dodany`,
        });
        getEmailsRequest();
      })
      .catch((error) => httpResponseHandler(error));
  };

  const deleteEmailRequest = (emailId) => {
    axios
      .delete(`${BASE_URL}/quality-controls/${emailId}`)
      .then((response) => {
        statementEvent.next({
          isError: false,
          content: "Email został usunięty",
        });
        getEmailsRequest();
      })
      .catch((error) => httpResponseHandler(error));
  };

  const addNewEmailPTS = (email) => {
    addNewEmailRequest(email, "PTS");
  };

  const addNewEmailCandleTeaLight = (email) => {
    addNewEmailRequest(email, "TEALIGHT");
  };

  const addNewEmailCandle = (email) => {
    addNewEmailRequest(email, "CANDLE");
  };

  return (
    <div className="page-wrapper" style={{ flexDirection: "column" }}>
      <EmailSectionComponent
        title="PTS"
        emails={emails.filter((e) => e.productType === "PTS")}
        addNewEmail={addNewEmailPTS}
        deleteEmail={deleteEmailRequest}
      />
      <EmailSectionComponent
        title="TeaLight"
        emails={emails.filter((e) => e.productType === "TEALIGHT")}
        addNewEmail={addNewEmailCandleTeaLight}
        deleteEmail={deleteEmailRequest}
      />

      <EmailSectionComponent
        title="Świeczka"
        emails={emails.filter((e) => e.productType === "CANDLE")}
        addNewEmail={addNewEmailCandle}
        deleteEmail={deleteEmailRequest}
      />
    </div>
  );
};

export default MesQualityControlPage;
