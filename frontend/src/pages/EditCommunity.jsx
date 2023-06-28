import React, { useEffect } from "react";

import { Header } from "../components";
import { Button } from "../components";

import { useState } from "react";

import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, useParams } from "react-router-dom";

const EditCommunity = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [description, setDescription] = useState('');
    const { currentColor, currentMode } = useStateContext();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9000/api/community/${id}`)
            .then(response => {
                response.json().then(x => {
                    console.log(x);
                    setName(x.name);
                    setDistrict(x.district)
                    setState(x.state)
                    setDescription(x.description)
                })
            })
    }, [])
    async function updatePost(e) {
        e.preventDefault();
        const data = {
            name,
            state,
            district,
            description
        };
        console.log(data);
        const response = await fetch(`http://localhost:9000/api/community/${id}`, {
            method: 'PUT', //update the page
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },

            credentials: 'include',
        })
        //after we updated the page, we wanna redirect to the post page we have edited i.e. /post/:id
        if (response.ok) {
            setRedirect(true);
        }
    }



    if (redirect) {
        return <Navigate to={'/community_list'} />
    }
    return (
        <div className="flex justify-center items-start min-h-screen">
            <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 md:p-8 bg-white rounded-3xl">
                <Header category="App" title="Edit Community" />
                <div className="text-center">
                    <div className="w-full">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" >
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
                                        id="name"
                                        type="text"
                                        placeholder="Community Name"
                                        value={name}
                                        onChange={ev => setName(ev.target.value)}
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
                                        id="state"
                                        type="text"
                                        placeholder="State"
                                        value={state}
                                        onChange={ev => setState(ev.target.value)}
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
                                        id="district"
                                        type="text"
                                        placeholder="District"
                                        value={district}
                                        onChange={ev => setDistrict(ev.target.value)}
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
                                        id="description"
                                        type="textArea"
                                        placeholder="Discription"
                                        value={description}
                                        onChange={ev => setDescription(ev.target.value)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div onClick={updatePost} >
                                        <Button
                                            color="white"
                                            bgColor={currentColor}
                                            text="Edit Community"
                                            borderRadius="10px"

                                        />
                                    </div>

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

export default EditCommunity