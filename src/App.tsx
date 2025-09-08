import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import DisconnectedLayout from "./layouts/DisconnectedLayout";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<DisconnectedLayout />}>
        <Route index element={<Home />} />
        <Route path="reinitialisation-mot-passe" element={<ResetPassword />} />
      </Route>
    </Routes>
    < ReactQueryDevtools />
    </>
  );
};

export default App;
