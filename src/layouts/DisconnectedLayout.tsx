import { Outlet } from "react-router";

const DisconnectedLayout = () => {
  return (
    <main className="container flex flex-col items-center justify-around min-h-screen h-full mx-auto my-5">
      <Outlet />
    </main>
  );
};

export default DisconnectedLayout;
