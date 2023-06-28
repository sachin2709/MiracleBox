import React from "react";
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

import { BsGraphUp, BsCalendar4Event } from "react-icons/bs";
import { isAuthenticated } from '../auth/helper/index';
import { VscOrganization } from "react-icons/vsc";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { RiContactsLine, RiStockLine, RiCommunityLine } from "react-icons/ri";

import { GiLouvrePyramid } from "react-icons/gi";



export const links = [
    {
      title: "Dashboard",
      links: [
        {
          name: "tinymiracle",
          icon: <VscOrganization />,
          link: "tinymiracle",
        },
        {
          name: "SignIn",
          icon: <BsCalendar4Event />,
          link: "signin"
        },
        {
          name: "SignUp",
          icon: <BsCalendar4Event />,
          link: "signup"
        },
      ],
    },
   
    {
      title: "Community",
      links: [
        {
          name: "Volunteers",
          icon: <RiContactsLine />,
          link: "vol_list",
        },
        {
          name: "Communities",
          icon: <RiCommunityLine />,
          link: "community_list",
        },
        {
          name: "Community Details",
          icon: <RiCommunityLine />,
          link: "community_details",
        },
        {
          name: "Create",
          icon: <IoCreateOutline />,
          link: "create_community",
        },
        {
          name: "Status",
          icon: <BsGraphUp />,
          link: "community_status", // import {BsGraphUp,BsCalendar4Event } from react-icons/bs
        },
        {
          name: "Sessions",
          icon: <BsCalendar4Event />,
          link: "community_sessions",
        },
  
        {
          name: "Requests",
          icon: <VscOrganization />,
          link: "vol_req",
        },
      ],
    },
    {
      title: "Apps",
      links: [
        {
          name: "calendar",
          icon: <AiOutlineCalendar />,
          link: "calendar",
        },
        {
          name: "kanban",
          icon: <BsKanban />,
          link: "kanban",
        },
        // {
        //   name: "editor",
        //   icon: <FiEdit />,
        //   link: "editor",
        // },
        // {
        //   name: "color-picker",
        //   icon: <BiColorFill />,
        //   link: "color-picker",
        // },
      ],
    },
    {
      title: "Charts",
      links: [
        {
          name: "line",
          icon: <AiOutlineStock />,
          link: "line",
        },
        {
          name: "area",
          icon: <AiOutlineAreaChart />,
          link: "area",
        },
  
        {
          name: "bar",
          icon: <AiOutlineBarChart />,
          link: "bar",
        },
        {
          name: "pie",
          icon: <FiPieChart />,
          link: "pie",
        },
        {
          name: "financial",
          icon: <RiStockLine />,
          link: "financial",
        },
        {
          name: "color-mapping",
          icon: <BsBarChart />,
          link: "color-mapping",
        },
        {
          name: "pyramid",
          icon: <GiLouvrePyramid />,
          link: "pyramid",
        },
        {
          name: "stacked",
          icon: <AiOutlineBarChart />,
          link: "stacked",
        },
      ],
    },
  ];