import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { isAuthenticated } from '../auth/helper/index';

import { links } from '../data/sidedummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const [filteredLinks, setFilteredLinks] = useState(links);
  const [role, setRole] = useState(0);
  useEffect(() => {
    const auth = isAuthenticated();
    if (auth) {
      setRole(auth.user.role)
    }
    console.log(role);
    if (!auth) {
      const filteredLink = links.filter(x => x.title === "Dashboard");
      setFilteredLinks(filteredLink);
    } else {
      const modify = links.map(x => {
        if (x.title === "Dashboard") {
          const object = x.links.filter(y => y.name === "tinymiracle")
          return { ...x, links: object }
        }
         if (role === 0) {
          console.log("role",role)
          const obj = x.links.filter(y => {
            if (y.name === "Volunteers" || y.name === "Create" || y.name === "Requests")
              return false;
            return true;
          })
          return { ...x, links: obj }
        }
        return x;
      })
      setFilteredLinks(modify);
    }
  }, [role]);
 console.log(role);
  console.log(filteredLinks)
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>Tiny Miracles</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {filteredLinks.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((x) => (

                  <NavLink
                    to={`/${x.link}`}
                    key={x.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {x.icon}
                    <span className="capitalize ">{x.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
