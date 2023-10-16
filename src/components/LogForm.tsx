"use client";

import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const labelText = "ml-1 text-md text-[#ededed] duration-300";
const inputClassName =
  "mt-1 py-2 px-2 rounded-lg md:w-[500px] w-5/6 text-white border border-[#ededed] bg-transparent focus:outline-none duration-300";

const LogForm = () => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    place: "",
    latitude: "",
    longitude: "",
    image: "",
    visitDate: "",
    expression: "",
  });
  const formIsValid =
    form.place.length > 0 &&
    form.image.length > 0 &&
    form.latitude.length > 0 &&
    form.longitude.length > 0 &&
    form.visitDate.length > 0 &&
    form.expression.length > 0;

  const onAdd = async (e: any) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:3000/api/logs/new", {
        form,
      });

      // router.push("/map");
      window.location.href = "/map";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="bg-black h-[100vh] text-white">
      <h1 className="text-2xl text-center font-semibold pt-4">
        Type the Destinations
      </h1>
      <div className="flex items-center flex-col mt-2">
        <div className="md:w-[500px] w-5/6 duration-300">
          <label className={labelText}>Place</label>
        </div>
        <input
          placeholder="Tbilisi"
          onChange={(e) => setForm({ ...form, place: e.target.value })}
          className={inputClassName}
          type="text"
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="md:w-[500px] w-5/6 duration-300">
          <label className={labelText}>Latitude</label>
        </div>
        <input
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          placeholder="41.716667"
          className={inputClassName}
          type="text"
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="md:w-[500px] w-5/6 duration-300">
          <label className={labelText}>Longitude</label>
        </div>
        <input
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          placeholder="44.783333"
          className={inputClassName}
          type="text"
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="md:w-[500px] w-5/6 duration-300">
          <label className={labelText}>Image</label>
        </div>
        <input
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="*.png, *.jpg, *.*"
          className={inputClassName}
          type="text"
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="md:w-[500px] w-5/6 duration-300">
          <label className={labelText}>Date (visited)</label>
        </div>
        <input
          onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
          className="date duration-300 mt-1 py-2 px-2 rounded-lg md:w-[500px] w-5/6 text-white border border-[#ededed] bg-transparent focus:outline-none"
          type="date"
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="md:w-[500px] w-5/6 duration-300">
          <label className={labelText}>
            Expressions (Tell us about your Expressions)
          </label>
        </div>
        <textarea
          onChange={(e) => setForm({ ...form, expression: e.target.value })}
          className={`${inputClassName}`}
          rows={5}
          cols={50}
          placeholder="After long time of waiting i finnaly went to Tbilisi ..."
        ></textarea>
        {/* <div className="md:w-[500px] flex justify-end mt-3 mr-1 duration-300 w-5/6"> */}
        <Button
          disabled={!formIsValid}
          className="h-0 md:w-[500px] w-5/6 duration-300 mt-3 text-lg px-10 py-5 rounded-sm font-semibol"
          variant="outline"
          onClick={onAdd}
        >
          Submit
        </Button>
        {/* </div> */}
      </div>
    </form>
  );
};

export default LogForm;
