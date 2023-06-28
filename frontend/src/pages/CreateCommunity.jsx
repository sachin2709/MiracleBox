import React from "react";

import { Header } from "../components";
import { Button } from "../components";

import { useState } from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const CreateCommunity = () => {
  const { currentColor, currentMode } = useStateContext();
  const [redirect,setRedirect]=useState(false);
  const   createCategory = async (community) => {
    return  await fetch(`http://localhost:9000/api/community/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(community),
    })
      .then((response) => {
        if(response.ok){
          setRedirect(true);
        }
        return response.json();
      })
      .catch((err) => console.log(err));
     
  };
  
  const [values, setValues] = useState({
    name: "",
    state: "",
    district: "",
    description: "",
  });

  const { name, state, district, description } = values;

  const handelChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    // console.log(event);
    event.preventDefault();
    createCategory({ name, state, district, description })
      .then((data) => {
        if (data.error) {
          console.log(error);
        } else {
          setValues({
            ...values,
            name: "",
            state: "",
            district: "",
            description: "",
          });
        }
      })
      .catch(console.log("Error in Signup"));
  };
  if(redirect){
    return <Navigate to={'/community_list'}/>
  }
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-8 bg-white rounded-3xl">
        <Header category="App" title="Create Community" />
        <div className="text-center">
          <div className="w-full">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div className="mb-4">
                  <label
                    className="block text-left  text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Community Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Community Name"
                    onChange={handelChange("name")}
                    value={name}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-left text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    State
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="State"
                    onChange={handelChange("state")}
                    value={state}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-left text-gray-700 text-sm font-bold mb-2"
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
                <div className="mb-4">
                  <label
                    className="block text-left text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Discription
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="textArea"
                    placeholder="Discription"
                    onChange={handelChange("description")}
                    value={description}
                  />
                </div>

                <div className="flex items-center justify-between">
                <div onClick={onSubmit} >
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Create Community"
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

export default CreateCommunity;
