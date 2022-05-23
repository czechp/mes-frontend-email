import "./App.css";
import StatementComponent from "./components/StatementComponent/StatementComponent";
import TopBarComponent from "./components/TopBarComponent/TopBarComponent";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import React, { useState } from "react";
import TitleComponent from "./components/TitleComponent/TitleComponent";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginGuard from "./components/Guards/LoginGuard";
import AdminGuard from "./components/Guards/AdminGuard";
import NavigationBarComponent from "./components/NavigationBarComponent/NavigationBarComponent";
import ForbidenPage from "./pages/ForbiddenPage/ForbidenPage";
import UserManagmentPage from "./pages/UsersPage/UsersManagmentPage";
import configureInterceptors from "./services/configureInterceptors";
import SystemsPage from "./pages/SystemsPage/SystemsPage";
import UtbPage from "./pages/UtbPage/UtbPage";
import MesQualityControlPage from "./pages/MesQualityControlPage/MesQualityControlPage";
import MesBreakdownPage from "./pages/MesBreakdownPage/MesBreakdownPage";

export const TitleContext = React.createContext();

function App() {
  const [title, setTitle] = useState();
  configureInterceptors();

  return (
    <BrowserRouter>
      <TopBarComponent />
      <TitleContext.Provider value={{ title, setTitle }}>
        <NavigationBarComponent />
        <TitleComponent />
        <Switch>
          {/* THIS AREA BEEN CHANGED BY ROUTER */}
          <LoginGuard path="/" exact component={() => <SystemsPage />} />
          <LoginGuard path="/utb" exact component={() => <UtbPage />} />
          <LoginGuard
            path="/mes-quality-control"
            exact
            component={() => <MesQualityControlPage />}
          />
          <LoginGuard
            path="/mes-breakdown"
            exact
            component={() => <MesBreakdownPage />}
          />
          <AdminGuard
            path="/users"
            exact
            component={() => <UserManagmentPage />}
          />
          <Route path="/login" exact component={() => <LoginPage />} />
          <Route path="/register" exact component={() => <RegisterPage />} />
          <Route path="/forbidden" exact component={() => <ForbidenPage />} />
        </Switch>
      </TitleContext.Provider>
      <StatementComponent />
    </BrowserRouter>
  );
}

export default App;
