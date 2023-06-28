import React, { useEffect } from "react";
import {
    AiOutlineCalendar,
    AiOutlineShoppingCart,
    AiOutlineAreaChart,
    AiOutlineBarChart,
    AiOutlineStock,
} from "react-icons/ai";
import {
    FiShoppingBag,
    FiEdit,
    FiPieChart,
    FiBarChart,
    FiCreditCard,
    FiStar,
    FiShoppingCart,
} from "react-icons/fi";
import {
    BsKanban,
    BsBarChart,
    BsBoxSeam,
    BsCurrencyDollar,
    BsShield,
    BsChatLeft,
} from "react-icons/bs";

import { Link, useNavigate, useParams } from 'react-router-dom';

import { BsGraphUp, BsCalendar4Event } from "react-icons/bs";

import { VscOrganization } from "react-icons/vsc";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { RiContactsLine, RiStockLine, RiCommunityLine } from "react-icons/ri";

import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";

import { useState } from "react";
export const peopleButton = (props) => {
    console.log(props);
    const navigate = useNavigate();
    const id = props._id;
    // console.log(id);
    const [bg, setBg] = useState('#c7736b');
    const [buttonText, setButtonText] = useState('Details');
    const handleClick = () => {
        navigate(`/community/session_details/people/${id}`);
    };

    return (
        <button
            type="button"
            style={{ background: bg }}
            className="text-white py-1 px-2 capitalize rounded-2xl text-md"
            onClick={handleClick}
        >
            {buttonText}
        </button>

    );
};
export const benefitButton = (props) => {
    const { id } = useParams();

    const [bg, setBg] = useState('#eb4034');
    const [buttonText, setButtonText] = useState('Benefited');
    const navigate = useNavigate();
    const handleClick = async () => {
        const peopleId = props._id;
        props.sessions.push({
            id: id,
            benefit: true,
            attended: true
        })

        await fetch(`http://localhost:9000/api/people/${peopleId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(props),
        })
        setBg('#46f249');
        setButtonText('Benefited');
    };

    return (
        <button
            type="button"
            style={{ background: bg }}
            className="text-white py-1 px-2 capitalize rounded-2xl text-md"
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
};

export const peopleGrid = [

    {
        field: "name",
        headerText: "Name",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "fatherName",
        headerText: "Father Name",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "motherName",
        headerText: "Mother Name",
        // format: "C2",
        textAlign: "Center",
        editType: "numericedit",
        width: "150",
    },
    {
        field: "phoneNumber",
        headerText: "Phone Number",
        width: "150",
        textAlign: "Center",
    },

    {
        headerText: "Gender",
        field: "gender",
        textAlign: "Center",
        width: "120",
        color: '#4ff075'
    },
    // {
    //     headerText: "Attendance",
    //     field: "Attendance",
    //     textAlign: "Center",
    //     width: "120",
    //     color: '#4932c9',
    //     template: peopleButton,
    // },
    {
        headerText: "Benefited",
        field: "benefited",
        textAlign: "Center",
        width: "120",
        color: '#4ff075',
        template: benefitButton,
    },
    {
        headerText: "Details",
        field: "Details",
        textAlign: "Center",
        width: "120",
        color: '#4932c9',
        template: peopleButton,
    },

];