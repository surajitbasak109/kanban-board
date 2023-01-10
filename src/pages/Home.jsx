import React from 'react';
import Footer from '../components/Footer';
import HomeNav from '../components/HomeNav';
import appImage from '../static/app.png';

const Home = () => {
  return (
    <div className="grid justify-items-center bg-white dark:bg-gray-900 w-full">
      <HomeNav />
      <div className="bg-white dark:bg-gray-900 px-10 pt-24 pb-48 w-full max-w-7xl">
        <div className="pl-3 text-center">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray dark:text-white">
            Welcome to{' '}
            <span className="font-extralight text-gray dark:text-gray-200">
              Kanban board <span className="font-bold">project</span>
            </span>
            <p className="mt-4 text-gray-800 dark:text-gray-500 text-md sm:text-lg lg:text-xl">
              Manage your projects easily and more effectively
            </p>
          </h1>
        </div>
      </div>
      <div className="grid justify-items-center -mb-36 bg-gray-200 p-10 w-full">
        <img
          src={appImage}
          className="w-full max-w-7xl h-auto relative -top-40 rounded-lg shadow-lg"
          alt="app screenshot"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
