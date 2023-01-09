import React from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';

const HomeNav = () => {
  const dark = () => {
    if (localStorage.theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <div className="flex justify-between items-center w-full max-w-7xl p-3 text-gray-500 border-b-2 border-gray-200 dark:border-gray-700 dark:text-gray-200">
      <Link to="/">
        <h1 className="text-center font-extralight text-2xl text-gray-800 dark:text-white">
          Simple Kanban Board using{' '}
          <span className="font-bold">React.js</span>
        </h1>
      </Link>
      <div className='flex justify-between items-center gap-4'>
        <Link to="/projects">
          <div className="py-2 px-5 bg-gray-600 dark:bg-white hover:bg-gray-900 text-white hover:text-gray-50 dark:hover:bg-white dark:focus:bg-white rounded-lg font-bold">
            <p className="text-md text-white dark:text-gray-900">
              Open Projects
            </p>
          </div>
        </Link>
        <MdOutlineDarkMode
          onClick={dark}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-white cursor-pointer"
        />
      </div>
    </div>
  );
};

export default HomeNav;
