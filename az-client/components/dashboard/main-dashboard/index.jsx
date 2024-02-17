"use client";
import { useEffect, useState } from "react";
import DashboardCtrl from "../dashboard-ctrl";

import PostMain from "../forms/posts-form";
import AdminPannel from "../forms/admin-pannel";
import UserMain from "../forms/users-form";
import CommentsMain from "../forms/comments-form";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import RuleMain from "../forms/rules-form";

const MainDashboard = () => {
  const [contentChanger, setContentChanger] = useState("admin-pannel");
  const [details, setDetails] = useState(<AdminPannel />);

  const goToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (contentChanger == "admin-pannel") {
      setDetails(<AdminPannel />);
    } else if (contentChanger == "users") {
      setDetails(<UserMain />);
    } else if (contentChanger == "comments") {
      setDetails(<CommentsMain />);
    }
    goToTop();
  }, [contentChanger]);

  //FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-start gap-1">
        <div
          className={
            menuIsOpen == -1
              ? "z-50 w-full md:w-64 bg-[#9bf5d4] md:bg-[#9bf5d4] p-2 rounded-none md:rounded md:bg-transparent fixed md:sticky md:top-8 md:right-0 md:bottom-4 h-auto m-2 md:py-1 md:px-2 top-0 bottom-0 left-[100%] md:left-0 -right-[120%] transition-all duration-500"
              : "z-50 w-full md:w-64 backdrop-blur-3xl md:bg-[#9bf5d4] p-2 rounded-none md:rounded md:bg-transparent h-[100vh] py-1 md:px-2 fixed top-0 bottom-0 right-0 left-0 md:absolute transition-all duration-500"
          }
        >
          <DashboardCtrl
            setContentChanger={setContentChanger}
            setMenuIsOpen={setMenuIsOpen}
          />
        </div>
        <div className="p-2 md:p-2 bg-[#9bf5d4] w-full rounded m-2">
          {details}
        </div>
      </div>
      <div className="fixed z-50 flex md:hidden top-2 left-2">
        <MdOutlineDashboard
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == -1
              ? "w-9 h-9 text-black flex"
              : "w-9 h-9 text-black hidden"
          }
        />
        <AiOutlineClose
          onClick={() => setMenuIsOpen(menuIsOpen * -1)}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-black flex"
              : "w-10 h-10 text-black hidden"
          }
        />
      </div>
    </div>
  );
};

export default MainDashboard;
