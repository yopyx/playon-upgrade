import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const Body = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
