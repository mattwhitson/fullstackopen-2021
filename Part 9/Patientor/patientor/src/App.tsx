import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientExpanded from "./components/PatientExpanded";

const App = () => {
  const [{patients}, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);


  const match = useRouteMatch('/api/users/:id')
  const patientLook = match 
    ? Object.values(patients).find(patient => { 
      return patient.id === match.params.id
    })
    : null

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/">
              <PatientListPage />
            </Route>
            <Route path='/api/patients/:id'>
              <PatientExpanded patient={patientLook} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
