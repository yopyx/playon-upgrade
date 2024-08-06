import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import ScrollToTop from "./ScrollToTop";

const Body = () => {
  return (
    <div className="flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex gap-x-5">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
