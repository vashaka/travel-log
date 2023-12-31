/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Log } from "@/models/Log";
import { useRouter } from "next/navigation";

const labelText = "ml-1 text-base text-[#ededed] duration-300";
const inputClassName =
  "mt-1 py-2 px-2 rounded-lg w-[90%] text-white border border-[#ededed] bg-transparent focus:outline-none duration-300";

const LogForm = ({
  onClose,
  markerPosition,
  formToEdit,
  id,
}: {
  onClose: MouseEventHandler<SVGSVGElement> | undefined;
  markerPosition: { lat: number; lng: number } | null;
  formToEdit: Log | null;
  id: string | undefined;
}) => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    place: formToEdit?.place || "",
    rating: formToEdit?.rating || "",
    latitude: formToEdit?.latitude || "",
    longitude: formToEdit?.longitude || "",
    image: formToEdit?.image || "",
    visitDate: formToEdit?.visitDate || "",
    expression: formToEdit?.expression || "",
  });

  React.useEffect(() => {
    if (markerPosition === null) return;
    setForm({
      ...form,
      latitude: markerPosition.lat,
      longitude: markerPosition.lng,
    });
  }, [markerPosition]);

  const formIsValid =
    form.place.trim().length > 0 &&
    form.image.trim().length > 0 &&
    form.rating.trim().length > 0 &&
    form.visitDate.length > 0 &&
    form.expression.trim().length > 0;

  const onDelete = async (e: any) => {
    try {
      e.preventDefault();
      await axios.post(`http://localhost:3000/api/logs/delete/${id}`);
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  const onAdd = async (e: any) => {
    try {
      if (id) {
        e.preventDefault();
        await axios.post(`http://localhost:3000/api/logs/edit/${id}`, {
          place: form.place,
          rating: form.rating,
          latitude: form.latitude,
          longitude: form.longitude,
          image: form.image,
          visitDate: form.visitDate,
          expression: form.expression,
        });

        window.location.href = "/";
      } else {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/logs/new", {
          form,
        });

        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="bg-black sm:h-[100vh] h-[110vh]  text-white">
      <div className="absolute right-4 top-5 duration-300 hover:rotate-90">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6 cursor-pointer"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="sm:text-2xl text-xl text-center font-semibold pt-4">
        Type the Destination
      </h1>
      <div className="flex items-center flex-col mt-2">
        <div className="w-[90%] duration-300">
          <label className={labelText}>Place</label>
        </div>
        <input
          placeholder="Tbilisi"
          onChange={(e) => setForm({ ...form, place: e.target.value })}
          className={inputClassName}
          type="text"
          value={form.place}
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="w-[90%] duration-300">
          <label className={labelText}>Stars</label>
        </div>
        <input
          onChange={(e) => {
            if (isNaN(Number(e.target.value))) return;
            setForm({ ...form, rating: e.target.value });
          }}
          placeholder="0"
          className={inputClassName}
          maxLength={2}
          type="text"
          value={form.rating || ""}
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="w-[90%] duration-300">
          <label className={labelText}>Latitude</label>
        </div>
        <input
          onChange={(e) =>
            setForm({ ...form, latitude: Number(e.target.value) })
          }
          placeholder="41.716667"
          className={inputClassName}
          type="number"
          value={form.latitude || ""}
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="w-[90%] duration-300">
          <label className={labelText}>Longitude</label>
        </div>
        <input
          onChange={(e) =>
            setForm({ ...form, longitude: Number(e.target.value) })
          }
          placeholder="44.783333"
          className={inputClassName}
          type="number"
          value={form.longitude || ""}
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="w-[90%] duration-300">
          <label className={labelText}>Image</label>
        </div>
        <input
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="*.png, *.jpg, *.*"
          className={inputClassName}
          type="text"
          value={form.image}
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="w-[90%] duration-300">
          <label className={labelText}>Date (visited)</label>
        </div>
        <input
          onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
          className="date duration-300 mt-1 py-2 px-2 rounded-lg w-[90%] text-white border border-[#ededed] bg-transparent focus:outline-none"
          type="date"
          value={form.visitDate}
        />
      </div>

      <div className="flex items-center flex-col mt-4">
        <div className="w-[90%] duration-300">
          <label
            className={`ml-1 md:text-base text-[#ededed] duration-300 text-xs`}
          >
            Expressions (Tell us about your Expressions)
          </label>
        </div>
        <textarea
          onChange={(e) => setForm({ ...form, expression: e.target.value })}
          className={`${inputClassName}`}
          rows={5}
          cols={50}
          placeholder="After long time of waiting i finnaly went to Tbilisi ..."
          value={form.expression}
        ></textarea>

        {formToEdit ? (
          <div>
            <Button
              className="h-0 w-[45%] mr-1 duration-300 mt-3 text-lg px-10 py-[1.3rem] rounded-sm font-semibol"
              variant="destructive"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              disabled={!formIsValid}
              className={`h-0 ${
                formToEdit ? "w-[45%]" : "w-[90%]"
              } ml-1 duration-300 mt-3 text-lg px-10 py-5 rounded-sm font-semibol`}
              variant="outline"
              onClick={onAdd}
            >
              Edit
            </Button>
          </div>
        ) : (
          <Button
            disabled={!formIsValid}
            className={`h-0 ${
              formToEdit ? "w-[45%]" : "w-[90%]"
            } ml-1 duration-300 mt-3 text-lg px-10 py-5 rounded-sm font-semibol`}
            variant="outline"
            onClick={onAdd}
          >
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default LogForm;
