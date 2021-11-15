import React, { useState } from "react";

import Link from "next/link";

interface Props {}

const Navbar = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white">
        <div className="px-4 sm:px-6 md:px-6 lg:px-6">
          <div className="relative flex items-center justify-center h-16">
            <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
              <button
                onClick={toggle}
                aria-label="menu"
                className="inline-flex items-center justify-center p-2 text-gray-600 transition duration-150 ease-in-out rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={isOpen ? "hidden" : "inline-flex"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={isOpen ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute flex items-center pr-2 lg:static lg:inset-x-auto lg:pr-0">
              <Link href="/">
                <a>
                  {" "}
                  <img
                    src={"logo.svg"}
                    alt="Schoolhouse.world logo"
                    className="hidden ml-2 w-44 lg:ml-0 lg:block"
                  />
                  <img
                    src={"logo.svg"}
                    alt="Schoolhouse.world logo"
                    className="block ml-4 w-44 lg:hidden"
                  />
                </a>
              </Link>
            </div>
            <div className="flex items-center mr-auto">
              <div className="hidden lg:block lg:ml-6">
                <div className="flex">
                  <Link href="#explore">
                    <a className="flex flex-row items-center py-2 pl-4 pr-1 font-semibold leading-5 text-gray-600 transition duration-150 ease-in-out rounded-full text-md hover:text-base focus:outline-none">
                      Explore
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-1 text-gray-600 transition duration-150 ease-in-out hover:text-base"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>
                  </Link>

                  <Link href="#live-help">
                    <a className="px-4 py-2 ml-4 font-semibold text-gray-600 transition duration-150 ease-in-out rounded-full text-md focus:outline-none hover:text-base focus:bg-opacity-75">
                      {" "}
                      Live Help
                    </a>
                  </Link>

                  <Link href="#about">
                    <a className="px-4 py-2 ml-4 font-semibold text-gray-600 transition duration-150 ease-in-out rounded-full text-md focus:outline-none hover:text-base focus:bg-opacity-75">
                      {" "}
                      About
                    </a>
                  </Link>

                  <Link href="#faq">
                    <a className="px-4 py-2 ml-4 font-semibold text-gray-600 transition duration-150 ease-in-out rounded-full text-md focus:outline-none hover:text-base focus:bg-opacity-75">
                      {" "}
                      FAQ
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="block">
              <Link href="#sign-in">
                <a className="px-4 py-2 ml-auto text-base font-semibold transition duration-150 ease-in-out bg-white rounded-full text-md focus:outline-none hover:text-blue-600 focus:bg-opacity-75">
                  {" "}
                  Sign In
                </a>
              </Link>
            </div>

            <div className="hidden sm:block">
              <Link href="#sign-up">
                <a className="px-8 py-3 ml-auto font-semibold text-white transition duration-150 ease-in-out rounded rounded-lg text-md bg-base focus:outline-none hover:bg-blue-600 focus:bg-blue-600">
                  {" "}
                  Sign Up
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className={isOpen ? "block" : "hidden"}>
          <div className="px-2 pt-2 pb-3 sm:ml-2 font-base">
            <Link href="#explore">
              <a className="block px-4 py-2 mt-1 text-2xl font-semibold text-gray-600 transition duration-150 ease-in-out focus:outline-none focus:text-white">
                Explore
              </a>
            </Link>
            <div className="w-full h-[0.15rem] bg-gray-300"></div>

            <Link href="#live-help">
              <a className="block px-4 py-2 mt-1 text-2xl font-semibold text-gray-600 transition duration-150 ease-in-out rounded-lg hover:text-white focus:outline-none focus:text-white">
                {" "}
                Live Help{" "}
              </a>
            </Link>
            <div className="w-full h-[0.15rem] bg-gray-300"></div>

            <Link href="#about">
              <a className="block px-4 py-2 mt-1 text-2xl font-semibold text-gray-600 transition duration-150 ease-in-out bg-white rounded-lg hover:opacity-75 focus:outline-none focus:opacity-75">
                {" "}
                About
              </a>
            </Link>
            <div className="w-full h-[0.15rem] bg-gray-300"></div>

            <Link href="#faq">
              <a className="block px-4 py-2 mt-1 text-2xl font-semibold text-gray-600 transition duration-150 ease-in-out bg-white rounded-lg hover:opacity-75 focus:outline-none focus:opacity-75">
                {" "}
                FAQ
              </a>
            </Link>
            <div className="w-full h-[0.15rem] bg-gray-300"></div>
          </div>
        </div>
        <div className="w-full h-[0.15rem] bg-gray-300"></div>
      </nav>
    </>
  );
};

Navbar.defaultProps = {};

export default Navbar;
