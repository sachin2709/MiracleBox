import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/helper/index';

const MyProfile = () => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [sessions, setSessions] = useState(0);
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
        setSessions(posts.sessions.organizedSessions.length)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])



  return (
    <div className="flex items-center justify-center h-screen">
      <div
        data-popover
        id="popover-user-profile"
        role="tooltip"
        className="absolute z-10 inline-block w-80 h-[50%] text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
      >
        <div className="flex items-center justify-between mb-2 flex-col p-3">
          <p className="m-4 text-lg font-thin text-gray-500 dark:text-white">
            Your Profile
          </p>
          <div className="flex items-center justify-between mb-2">
            <a href="#">
              <img
                className="w-32 h-32 mb-3 shadow-lg rounded-full"
                src="https://avatars3.githubusercontent.com/u/11801238?v=4"
                alt="Jese Leos"
              />
            </a>
          </div>
          <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <b>{name}</b>
          </p>
          <p className="mb-3 text-sm font-normal">
            {email}
          </p>
          <hr className="w-4/5 h-0.2 bg-white m-5"></hr>
          <p className="m-4 text-lg font-thin text-gray-500 dark:text-white">
            {profile} At Tiny Miracles  ❤️
          </p>
          <ul className="flex flex-col justify-start  text-sm mb-3">
            <li className="m-2">
              <a href="#" className="hover:underline">
                <span>Sessions Conducted: </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {/* {sessions} */} 12
                </span>

              </a>
            </li>
            <li className="m-2">
              <a href="#" className="hover:underline">
                <span>People Added: </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                128
                </span>

              </a>
            </li>
            <li className="m-2">
              <a href="#" className="hover:underline">
                <span>People Benfited: </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  80
                </span>

              </a>
            </li>
          </ul>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
  );
};

export default MyProfile;