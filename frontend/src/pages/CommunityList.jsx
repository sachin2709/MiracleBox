import React, { useState, useEffect } from "react";

import { Header } from "../components";
import { Link } from 'react-router-dom';
import { IoIosMore } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";

import product9 from "../data/product9.jpg";

import { Button } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import CommInfo from "./CommInfo";
import communities from '../communitydummy'
import { isAuthenticated } from '../auth/helper/index';
const CommunityList = () => {

  const { currentColor, currentMode } = useStateContext();
  const [role, setRole] = useState(2);
  const [comm, setComm] = useState([]);
  useEffect(() => {
    const authi = isAuthenticated();
    if (authi) {
      setRole(authi.user.role)
    }

    fetch('http://localhost:9000/api/community/all').then(response => {
      response.json().then(posts => {
        console.log(posts);
        setComm(posts);
      })
    })

  }, [])
  console.log("role is ", role)

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between ml-9 w-800 " >
        <Header category="Page" title="Community Details" />
        <div className="mt-3" onClick={() => { }}>
          {role == 2 && <Link to="/create_community">
            <Button
              color="white"
              bgColor={currentColor}
              text="Create New Community"
              borderRadius="10px"
            />
          </Link>}

        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', background: "smoke" }} >

        {/* {communities.map(x => <CommInfo {...x} />)}
         */}
        {comm.length > 0 && comm.map(x => <CommInfo {...x} />)}




      </div>
    </div>
  );
};
export default CommunityList;
