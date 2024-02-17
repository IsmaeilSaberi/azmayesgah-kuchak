"use client";
import { useState } from "react";
import DCBtn from "./btn";

const DashboardCtrl = ({ setContentChanger, setMenuIsOpen }) => {
  const [colorChanger, setColorChanger] = useState("admin-pannel");
  return (
    <div className="flex justify-center items-center my-2 ">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <DCBtn
          title={"پیشخوان"}
          content={"admin-pannel"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
          setMenuIsOpen={setMenuIsOpen}
        />
        <DCBtn
          title={"کاربرها"}
          content={"users"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
          setMenuIsOpen={setMenuIsOpen}
        />
        <DCBtn
          title={"دیدگاهها"}
          content={"comments"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
          setMenuIsOpen={setMenuIsOpen}
        />
      </div>
    </div>
  );
};

export default DashboardCtrl;
