import React, { useState, useEffect } from "react";

import { Header } from "../components";
import { Link } from 'react-router-dom';
import { IoIosMore } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";

import product9 from "../data/product9.jpg";
import { isAuthenticated } from '../auth/helper/index';
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const CommInfo = (item) => {
    const { currentColor, currentMode } = useStateContext();
    const [role, setRole] = useState()
    useEffect(() => {
        const authi = isAuthenticated();
        if (authi) {
            setRole(authi.user.role)
        }
    }, [])

    const clickHandler = () => {

    }
    return (

        <div className="w-600 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">{item.name}</p>

                <div className="flex  column ">
                    {role == 2 && <Link to={`/community/${item._id}`}>
                        <button
                            type="button"
                            className="text-xl font-semibold text-gray-500 m-2"
                        >
                            <GoPencil />
                        </button>
                    </Link>}

                    {/* <button
                        type="button"
                        className="text-xl font-semibold text-gray-500 m-2"
                    >
                        <AiOutlineDelete />
                    </button> */}
                </div>
            </div>
            <div className="mt-10">
                <img className="md:w-96 h-50 " src={product9} alt="" />
                <div className="mt-8">
                    <p className="text-gray-400 ">{`${item.district} , ${item.state}`}</p>
                    <p className="mt-6 text-sm text-gray-400">
                        {item.description}
                    </p>
                    <p className="font-semibold text-sm mt-2">{item.sessions.length} Sessions Organized</p>

                    <div className="mt-3" onClick={clickHandler}>
                        <Link to={`/sessions/${item._id}`}>
                            <Button
                                color="white"
                                bgColor={currentColor}
                                text="See Details"
                                borderRadius="10px"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default CommInfo