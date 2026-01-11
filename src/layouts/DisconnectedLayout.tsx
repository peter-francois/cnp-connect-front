import { Outlet } from "react-router";

const DisconnectedLayout = () => {
  return (
    <main className="container flex flex-col items-center justify-evenly min-h-screen h-full mx-auto">
       <div className="px-5"><img src="LOGO-CNP-CONNECT.png" alt="" /></div>
      <Outlet />
    </main>
  );
};

export default DisconnectedLayout;
