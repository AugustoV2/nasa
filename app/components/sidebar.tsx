'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { RiEarthquakeFill } from 'react-icons/ri';
import { FaTemperatureLow, FaWater, FaCloudShowersWater } from 'react-icons/fa6';
import { MdEmergencyShare, MdAir } from 'react-icons/md';
import { TbUvIndex } from 'react-icons/tb';
import { BsChatDots } from 'react-icons/bs'; // Chat icon
import Link from 'next/link';
import { MdNetworkCell } from "react-icons/md";


interface SidebarProps {
  onLocationSubmit: (location: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLocationSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (inputValue.trim()) {
      onLocationSubmit(inputValue); // Pass input to parent
    }
  }

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-[500px] h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-black dark:bg-black">
          <ul className="space-y-2 font-medium">
            
            {/* Search Location Form */}
            <li>
              <form className="flex items-center max-w-lg mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 21 21"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="voice-search"
                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Search Location"
                    value={inputValue}
                    onChange={handleInputChange}
                    required
                  />
                  <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    <svg
                      className="w-4 h-4 text-white hover:text-blue-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-3.867-3.867M9.8 5.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </li>

            {/* Icon Grid with uniform size and consistent button design */}
            <li className="grid grid-cols-3 gap-4 mt-4 pt-10">
              
              {/* Earthquake Icon */}
              <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/earthquake">
                  <RiEarthquakeFill className="text-5xl text-red-400 mx-auto" />
                </Link>
              </div>

              {/* Temperature Icon */}
              <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/temperature">
                  <FaTemperatureLow className="text-5xl text-blue-400 mx-auto" />
                </Link>
              </div>

              {/* Air Quality Icon */}
              <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/airquality">
                  <MdAir className="text-5xl text-green-400 mx-auto" />
                </Link>
              </div>

             

              {/* Precipitation Icon */}
              <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/precipitation">
                  <FaCloudShowersWater className="text-5xl text-light-blue-400 mx-auto" />
                </Link>
              </div>

              {/* Emergency Icon */}
              <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/emergency">
                  <MdEmergencyShare className="text-5xl text-red-500 mx-auto" />
                </Link>
              </div>

              {/* Water Quality Icon */}
              <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/water">
                  <FaWater className="text-5xl text-blue-500 mx-auto" />
                </Link>
              </div>

               {/* 5G coverage */}
               <div className="p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                <Link href="components/uvindex">
                  <MdNetworkCell   className="text-5xl text-blue-500 mx-auto" />
                </Link>
              </div>

            </li>

            {/* Chat Option */}
            <li className="mt-4">
              <Link href="components/chat">
                <div className="flex items-center space-x-3 p-4 border-4 border-transparent bg-gray-900 shadow-lg rounded-lg hover:scale-105 transition-transform duration-200">
                  <BsChatDots className="text-3xl text-purple-400" />
                  <span className="text-lg font-semibold text-white">
                    Chat with Me
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
