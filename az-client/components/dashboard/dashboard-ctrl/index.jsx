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
          title={"آزمایش ها"}
          content={"products"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
          setMenuIsOpen={setMenuIsOpen}
        />
        <DCBtn
          title={"اسلایدرها"}
          content={"sliders"}
          setContentChanger={setContentChanger}
          colorChanger={colorChanger}
          setColorChanger={setColorChanger}
          setMenuIsOpen={setMenuIsOpen}
        />
        <DCBtn
          title={"پست ها"}
          content={"posts"}
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
          title={"قوانین"}
          content={"rules"}
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
