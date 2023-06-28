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

import { Link, useNavigate } from 'react-router-dom';

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

export const volReqButton = (props) => {
    const [bg, setBg] = useState('#eb4034');
    const [buttonText, setButtonText] = useState(props.btnText);
    const navigate = useNavigate();


    const handleClick = () => {
        setBg('#46f249');
        setButtonText('Approved');
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
export const makeAdminButton = (props) => {
    const userid = props._id;
   
    const [bg, setBg] = useState('#03c9d7');
    const [buttonText, setButtonText] = useState('Volunteer');
    const handleClick = async () => {
        const updatedobj={ ...props, role: 2}
        await fetch(`http://localhost:9000/api/user/${userid}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedobj),
        })
        setBg('#46f249');
        setButtonText('Admin');
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
export const volListButton = (props) => {
    const [bg, setBg] = useState('#c7736b');
    const [buttonText, setButtonText] = useState(props.btnText);
    const navigate = useNavigate();


    const handleClick = () => {
        setBg('#bf1606');
        setButtonText('Blocked');
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

export const volReqData = [
    {
        id: 1,
        Name: "Sachin Mishra",
        Email: "sachin@gmail.com",
        btnText: "Approve",
    },
    {
        id: 2,
        Name: "Pritesh Mishra",
        Email: "pritesh@gmail.com",
        btnText: "Approve",
    },

]
export const contextMenuItems = [
    "AutoFit",
    "AutoFitAll",
    "SortAscending",
    "SortDescending",
    "Copy",
    "Edit",
    "Delete",
    "Save",
    "Cancel",
    "PdfExport",
    "ExcelExport",
    "CsvExport",
    "FirstPage",
    "PrevPage",
    "LastPage",
    "NextPage",
];



export const volListData = [
    {
        id: 1,
        Name: "Sachin Mishra",
        Email: "sachin@gmail.com",
        btnText: "Block",
    },
    {
        id: 2,
        Name: "Pritesh Mishra",
        Email: "pritesh@gmail.com",
        btnText: "Block",
    },

]
export const volReqGrid = [

    {
        field: "name",
        headerText: "Name",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "email",
        headerText: "Email",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "date",
        headerText: "Applied At",
        width: "150",
        textAlign: "Center",
    },

    {
        field: "Approve",
        headerText: "Approve",
        width: "130",
        textAlign: "Center",
        template: volReqButton,
    }
];

export const volListGrid = [

    {
        headerText: "Name",
        field: "name",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "email",
        headerText: "Email",
        width: "150",
        textAlign: "Center",
    },
    {
        headerText: "Organized Sessions",
        field: "sessionCount",
        width: "150",
        textAlign: "Center",
    },
    {
        field: "date",
        headerText: "Joining Date",
        width: "130",
        textAlign: "Center",
    },
    {
        field: "adminText",
        headerText: "Make Admin",
        width: "100",
        textAlign: "Center",
        template: makeAdminButton,
    }
];
