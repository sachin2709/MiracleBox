import React from "react";

import { Header } from "../components";
import { Button } from "../components";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useStateContext } from "../contexts/ContextProvider";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isAuthenticated } from "../auth/helper/index";

const CreateSession = () => {
  const { currentColor, currentMode } = useStateContext();
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const User = isAuthenticated().user;

  const createSession = async (people) => {
    const userDetails = {
      ...people,
      user: User
    };
    console.log(userDetails);
    return await fetch(`http://localhost:9000/api/session/create/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (response.ok) {
          setRedirect(true);
        }
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const [values, setValues] = useState({
    name: '',
    description: '',
    date: null,
    category: '',
    district: '',
    state: ''
  });

  const {
    name,
    description,
    date,
    category,
    district,
    state,
  } = values;

  const handelChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (name) => (date) => {
    setValues({ ...values, [name]: date });
  };

  const onSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    createSession({
      name,
      description,
      date,
      category,
      district,
      state,

    })
      .then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            date: null,
            category: '',
            district: '',
            state: ''

          });
        }
      })
      .catch(console.log("Error in Creating People"));
  };
  if (redirect) {
    return <Navigate to={`/sessions/${id}`} />
  }
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-8 bg-white rounded-3xl">
        <Header category="App" title="Create Session" />
        <div className="text-center">
          <div className="w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="grid grid-cols-1 gap-6">
                {/* //name  */}
                <div className="mb-4">
                  <label
                    className="block text-left  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Session Name"
                    onChange={handelChange("name")}
                    value={name}
                  />
                </div>
                {/* description  */}
                <div className="mb-4">
                  <label
                    className="block text-left  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Description"
                    onChange={handelChange("description")}
                    value={description}
                  />
                </div>
                {/* State  */}
                <div className="mb-4">
                  <label
                    className="block text-left  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="District"
                    onChange={handelChange("state")}
                    value={state}
                  />
                </div>
                {/* District  */}
                <div className="mb-4">
                  <label
                    className="block text-left  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    District
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="District"
                    onChange={handelChange("district")}
                    value={district}
                  />
                </div>

                {/* //Category  */}

                <div className="mb-4">
                  <label
                    className="block text-left text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignContent: "space-around",
                    }}
                  >
                    <label className="mr-2">
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name="category"
                        value="health"
                        onChange={handelChange("category")}
                        checked={category === "health"}
                      />
                      Health
                    </label>
                    <label className="mr-2">
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name="category"
                        value="education"
                        onChange={handelChange("category")}
                        checked={category === "education"}
                      />
                      Education
                    </label>
                    <label className="mr-2">
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name="category"
                        value="Finance"
                        onChange={handelChange("category")}
                        checked={category === "Finance"}
                      />
                      Finance
                    </label>
                    <label className="mr-2">
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name="category"
                        value="womenEmpowerment"
                        onChange={handelChange("category")}
                        checked={category === "womenEmpowerment"}
                      />
                      Women Empowerment
                    </label>
                    <label className="mr-2">
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name="category"
                        value="welfareSchemes"
                        onChange={handelChange("category")}
                        checked={category === "welfareSchemes"}
                      />
                      Welfare Schemes
                    </label>
                    <label className="mr-2">
                      <input
                        className="mr-2 leading-tight"
                        type="radio"
                        name="category"
                        value="other"
                        onChange={handelChange("category")}
                        checked={category === "other"}
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* //Date */}
                <div className="mb-4">
                  <label
                    className="block text-left  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Date
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        id="username"
                        label="Date"
                        value={values.date}
                        onChange={handleDateChange("date")}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <div className="flex items-center justify-between">
                  <div onClick={onSubmit}>
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="Create Session"
                      borderRadius="10px"
                    />
                  </div>

                  {/* <button
                    type="button"
                    onClick={onSubmit}
                    style={{ backgroundColor: currentColor, color:"white", borderRadius:"10px" }}
                    className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
                  >
                    {icon} {text}
                  </button> */}
                </div>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 Acme Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
