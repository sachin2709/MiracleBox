import React from 'react'
import { Button } from '../components';
import { useStateContext } from "../contexts/ContextProvider";

const UserDetailCard = () => {

  const { currentColor, currentMode } = useStateContext();
  const [isOpen, setIsOpen] = React.useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const onSubmit = () => {

  }
  return (
    //Make the below componet to be shown on centre of display screen
    <div className="flex items-center justify-center h-screen">
      <div className="w-full p-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="https://avatars3.githubusercontent.com/u/11801238?v=4"
            alt="Bonnie image"
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>

          <hr className="w-4/5 h-0.2 bg-white m-5"></hr>

          <div className='m-2'>
            <span className="flex flex-row text-lg font-medium text-gray-900 dark:text-gray-400">
              <h5 className="font-medium text-lg text-gray-900 dark:text-white mr-3">STATE:</h5>
              <span className="text-lg font-thin text-gray-500 dark:text-gray-400 dark:text-white">MP, India</span>
            </span>
          </div>
          <div className='m-2'>
            <span className="flex flex-row text-lg font-medium text-gray-900 dark:text-gray-400">
              <h5 className="font-medium text-lg text-gray-900 dark:text-white mr-3">STATE:</h5>
              <span className="text-lg font-thin text-gray-500 dark:text-gray-400 dark:text-white">MP India</span>
            </span>
          </div>
          <div className='m-2'>
            <span className="flex flex-row text-lg font-medium text-gray-900 dark:text-gray-400">
              <h5 className="font-medium text-lg text-gray-900 dark:text-white mr-3">GENDER:</h5>
              <span className="text-lg font-thin text-gray-500 dark:text-gray-400 dark:text-white">Male</span>
            </span>
          </div>
          <div className='m-2'>
            <span className="flex flex-row text-lg font-medium text-gray-900 dark:text-gray-400">
              <h5 className="font-medium text-lg text-gray-900 dark:text-white mr-3">Martial Status:</h5>
              <span className="text-lg font-thin text-gray-500 dark:text-gray-400 dark:text-white">Unmarried</span>
            </span>
          </div>

          <div className="flex mt-4 space-x-3 md:mt-6">
            {/* <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add friend
          </a>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a> */}

            <div onClick={onSubmit} >
              <Button
                color="white"
                bgColor={currentColor}
                text="Edit Details"
                borderRadius="10px"

              />
            </div>

          </div>
        </div>
      </div>

    </div>

  );
}

export default UserDetailCard;