import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";

import { TitleContext } from "../../App";
import EmailSectionComponent from "../../components/EmailSectionComponent/EmailSectionComponent";
import { BASE_URL } from "../../services/CONSTANTS";
import httpResponseHandler from "../../services/httpResponseHandler";
import statementEvent from "../../services/statementEvent";

const MesBreakdownPage = () => {
  const { setTitle } = useContext(TitleContext);
  const [emails, setEmails] = useState([]);

  const getEmailsRequest = () => {
    axios
      .get(`${BASE_URL}/breakdowns`)
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        httpResponseHandler(error);
      });
  };

  const addNewEmailRequest = (breakdownType, email) => {
    axios
      .post(`${BASE_URL}/breakdowns`, { breakdownType, email })
      .then((response) => {
        statementEvent.next({
          isError: false,
          content: `Email ${email} został dodany`,
        });
        getEmailsRequest();
      })
      .catch((error) => httpResponseHandler(error));
  };

  const deleteEmailRequest = (id) => {
    axios
      .delete(`${BASE_URL}/breakdowns/${id}`)
      .then((response) => {
        statementEvent.next({
          isError: false,
          content: `Email  został usunięty`,
        });
        getEmailsRequest();
      })
      .catch((error) => httpResponseHandler(error));
  };

  const addNewEmailManagement = (email) => {
    addNewEmailRequest("MANAGEMENT", email);
  };

  const addNewEmailPTS = (email) => {
    addNewEmailRequest("PTS", email);
  };

  const addNewEmailTealight = (email) => {
    addNewEmailRequest("TEALIGHT", email);
  };


  const addNewEmailCandle = (email) => {
    addNewEmailRequest("CANDLE", email);
  };

  useEffect(() => {
    setTitle("MES - awarie");
    getEmailsRequest();
  }, []);
  return (
    <div className="page-wrapper" style={{ flexDirection: "column" }}>
      <EmailSectionComponent
        title="Długotrwałe awarie: "
        emails={emails.filter((e) => e.breakdownType === "MANAGEMENT")}
        addNewEmail={addNewEmailManagement}
        deleteEmail={deleteEmailRequest}
      />

      <EmailSectionComponent
        title="PTS awarie: "
        emails={emails.filter((e) => e.breakdownType === "PTS")}
        addNewEmail={addNewEmailPTS}
        deleteEmail={deleteEmailRequest}
      />

      <EmailSectionComponent
        title="Tealight awarie: "
        emails={emails.filter((e) => e.breakdownType === "TEALIGHT")}
        addNewEmail={addNewEmailTealight}
        deleteEmail={deleteEmailRequest}
      />

      <EmailSectionComponent
        title="Świeczka awarie: "
        emails={emails.filter((e) => e.breakdownType === "CANDLE")}
        addNewEmail={addNewEmailCandle}
        deleteEmail={deleteEmailRequest}
      />
    </div>
  );
};

export default MesBreakdownPage;
