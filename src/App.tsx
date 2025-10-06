import { Route, Routes } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";
import ConnectionPage from "./pages/Connection";
import ConnectedLayout from "./layouts/ConnectedLayout";
import User from "./pages/User";
import NouvelleAlerte from "./pages/alertes/NouvelleAlerte";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DisconnectedLayout />}>
          <Route index element={<ConnectionPage />} />
          <Route path="nouveau-mot-de-passe" element={<ChangePassword />} />
          <Route path="reinitialisation-mot-passe" element={<ResetPassword />} />
        </Route>
        <Route element={<ConnectedLayout />}>
          <Route path="/utilisateurs" element={<Users />} />
          <Route path="/utilisateurs/:id" element={<User />} />
          <Route path="/nouvelle-alert" element={<NouvelleAlerte />} />
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </>
  );
};

export default App;
