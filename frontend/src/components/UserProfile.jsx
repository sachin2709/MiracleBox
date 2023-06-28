import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { isAuthenticated } from '../auth/helper/index';
import { signout } from '../auth/helper/index';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");

  function capitalizeName(name) {
    var nameParts = name.split(" ");
    var firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
    var lastName = "";
    if (nameParts.length > 1) {
      lastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1);
    }
    var capitalizedFullName = firstName + " " + lastName;
    return capitalizedFullName;
  }
  const navigate = useNavigate();
  useEffect(() => {
    const auth = isAuthenticated();
    const UserId = auth.user._id;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/user/${UserId}`);
        const posts = await response.json();
        console.log(posts);
        setName(capitalizeName(posts.name))
        if (posts.role === 2)
          setProfile("Admin")
        else
          setProfile("Volunteer")
        setEmail(posts.email)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const handleLogout = () => {
    signout(() => {
      navigate('/');
      window.location.reload();
    });
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img className="rounded-full h-24 w-24" src={avatar} alt="user-profile" />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{name}</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">{profile}</p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{email}</p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
            onClick={() => {
              navigate('/my_profile');
            }}
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={handleLogout}
          style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
          className="p-3 w-full hover:drop-shadow-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;