"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import React from "react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  // new use state to open a menu
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <a rel="stylesheet" href="/" className="flex gap-2 flex-center">
        <img
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />

        <p className="logo_text">Promptopia</p>
      </a>


      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
        {session?.user? (
          <div className="flex gap-3 md:gap-5">
            <a href="/create-prompt" className="black_btn">
              Create Post
            </a>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <a href="/profile">
              <img
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </a>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {" "}
                  Sign In{" "}
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user? (
          <div className="flex">
            <img
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <a
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My Profile
                </a>

                <a
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </a>

                <button
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  {" "}
                  Sign In{" "}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
