import { classNames } from "@/utils";
import {
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import moment from "moment";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTwitter } from "react-icons/fa";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [query, setQuery] = useState("");
  const [defaultDev] = useState("octocat");
  const [dev, setDev] = useState(null);
  const [error, setError] = useState(null);
  const config = {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  useEffect(() => {
    getDev(defaultDev);
  }, [defaultDev]);

  const getDev = async (user) => {
    const url = `https://api.github.com/users/${user.trim().toLowerCase()}`;
    if (user.trim() === "") {
      setError("Whoops, can't be empty...");
    } else {
      await axios
        .get(url, config)
        .then(function (response) {
          // handle success
          setError(null);
          setDev(response.data);
        })
        .catch(function (err) {
          // handle error
          setError("No results");
        })
        .finally(function () {
          // always executed
        });
    }
  };
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-between overflow-hidden p-4 md:p-8 lg:p-12">
      <div className="w-full">
        {/* HEADER */}
        <div className=" flex justify-between pb-9">
          <span className="text-[26px] font-bold leading-[39px] text-light-text dark:text-dark-text">
            devfinder
          </span>
          <button
            className="group flex items-center gap-4 text-light-accent hover:text-light-text dark:text-dark-text hover:dark:text-dark-accent"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            <span className="hidden scale-0 transform text-[13px] uppercase leading-[19px] opacity-0 transition duration-200 ease-in dark:block dark:scale-100 dark:opacity-100">
              light
            </span>
            <span className="block scale-100 transform text-[13px] uppercase leading-[19px] opacity-100 transition duration-200 ease-in dark:hidden dark:scale-0 dark:opacity-0">
              dark
            </span>
            <span>
              <MoonIcon className="block h-5 w-5 scale-100 transform opacity-100 transition duration-200 ease-in dark:hidden dark:scale-0 dark:opacity-0" />
              <SunIcon className="hidden h-5 w-5 scale-0 transform opacity-0 transition duration-200 ease-in dark:block dark:scale-100 dark:opacity-100" />
            </span>
          </button>
        </div>
        {/* SEARCH */}
        <div>
          <label
            htmlFor="search"
            className="sr-only block text-sm font-medium leading-6 text-gray-900"
          >
            Search
          </label>
          <div className="relative mt-2 rounded-2xl shadow-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-light-primary">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </span>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-2xl border-0 bg-white px-12 py-6 text-sm text-light-text placeholder:text-light-secondary focus:ring-2 focus:ring-inset focus:ring-light-primary dark:bg-dark-bg2 dark:text-dark-text placeholder:dark:text-dark-accent md:text-[18px] md:leading-6"
              placeholder="Search Github username..."
              ariaDescribedby="search-username"
              onChange={(e) => {
                setError(null);
                setQuery(e.target.value);
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-3">
              <span
                className={classNames(
                  "transform pr-4 text-sm text-red-500 transition duration-200 ease-in md:text-base",
                  error ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              >
                {error}
              </span>
              <button
                className="rounded-xl bg-light-primary px-2 py-3 text-sm font-bold text-dark-text hover:bg-light-hover md:px-6"
                id="search-username"
                onClick={() => {
                  setError(null);
                  if (query.toLowerCase().trim() === "") {
                    console.log("No username entered");
                    toast.error("No username entered");
                  } else {
                    getDev(query);
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {/* RESULTS */}
        {dev && (
          <div className="mt-6 flex w-full flex-col overflow-hidden rounded-2xl bg-white px-7 py-12 shadow-lg dark:bg-dark-bg2 md:p-10 md:px-10 md:py-10">
            <div className="flex w-full items-center gap-5 md:gap-10 lg:items-start lg:gap-2">
              {/* AVATAR */}
              <img
                className="aspect-1 h-16 rounded-full md:h-32"
                src={dev.avatar_url}
              />
              {/* Dev Info */}
              <div className="flex-grow lg:ml-[28px]">
                <div className="flex w-full items-center justify-between">
                  {dev.name ? (
                    <span className="text-[26px] font-bold leading-[39px]">
                      {dev.name}
                    </span>
                  ) : (
                    <span className="text-light-secondary">Not available</span>
                  )}
                  {/* Desktop Join Date */}
                  <span className="hidden text-[13px] leading-[20px] text-light-secondary lg:block">
                    Joined {moment(dev.created_at).format("DD MMM YYYY")}
                  </span>
                </div>
                <p className="text-base text-light-primary">@{dev.login}</p>
                {/* Mobile & Tablet Join Date */}
                <p className="block text-[15px] leading-[22px] text-light-secondary lg:hidden">
                  Joined {moment(dev.created_at).format("DD MMM YYYY")}
                </p>
                {/* Desktop Bio */}
                <div className="hidden lg:mt-5 lg:block">
                  {dev.bio === null ? (
                    <p className="text-light-accent dark:text-dark-accent">
                      This profile has no bio
                    </p>
                  ) : (
                    <p>{dev.bio}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Mobile & Tablet Bio */}
            <div className="mt-5 block lg:hidden">
              {dev.bio === null ? (
                <p className="text-light-accent dark:text-dark-accent">
                  This profile has no bio
                </p>
              ) : (
                <p>{dev.bio}</p>
              )}
            </div>
            {/* Additional Info */}
            <div className="mt-8 flex justify-between rounded-2xl bg-light-bg1 px-8 py-4 dark:bg-dark-bg1 lg:ml-[148px]">
              <div className="flex flex-col items-start gap-2">
                <span>Repos</span>
                <span className="font-bold">{dev.public_repos}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span>Followers</span>
                <span className="font-bold">{dev.followers}</span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span>Following</span>
                <span className="font-bold">{dev.following}</span>
              </div>
            </div>
            <div className="mt-9 grid w-full grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-32 md:gap-y-5 lg:ml-[148px] lg:gap-x-0">
              <div className="flex items-center gap-2 md:text-[14px] md:leading-[20px] lg:text-[15px] lg:leading-[22px]">
                {dev.location ? (
                  <>
                    <MapPinIcon className="h-5 w-5 text-light-accent dark:text-dark-text" />

                    <span className="text-light-accent dark:text-dark-text">
                      {dev.location}
                    </span>
                  </>
                ) : (
                  <>
                    <MapPinIcon className="h-5 w-5 text-light-accent opacity-50 dark:text-dark-text" />
                    <span className="text-light-accent opacity-50 dark:text-dark-text">
                      Not Available
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 md:text-[14px] md:leading-[20px] lg:text-[15px] lg:leading-[22px]">
                {dev.twitter ? (
                  <>
                    <FaTwitter className="h-5 w-5 text-light-accent dark:text-dark-text" />

                    <span className="text-light-accent dark:text-dark-text">
                      {dev.twitter}
                    </span>
                  </>
                ) : (
                  <>
                    <FaTwitter className="h-5 w-5 text-light-accent opacity-50 dark:text-dark-text" />
                    <span className="text-light-accent opacity-50 dark:text-dark-text">
                      Not Available
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 md:text-[14px] md:leading-[20px] lg:text-[15px] lg:leading-[22px]">
                {dev.blog ? (
                  <>
                    <LinkIcon className="h-5 w-5 text-light-accent dark:text-dark-text" />
                    <span className="text-light-accent dark:text-dark-text">
                      {dev.blog}
                    </span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-5 w-5 text-light-accent opacity-50 dark:text-dark-text" />
                    <span className="text-light-accent opacity-50 dark:text-dark-text">
                      Not Available
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 md:text-[14px] md:leading-[20px] lg:text-[15px] lg:leading-[22px]">
                {dev.company ? (
                  <>
                    <BuildingOfficeIcon className="h-5 w-5 text-light-accent dark:text-dark-text" />

                    <span className="text-light-accent dark:text-dark-text">
                      {dev.company}
                    </span>
                  </>
                ) : (
                  <>
                    <BuildingOfficeIcon className="h-5 w-5 text-light-accent opacity-50 dark:text-dark-text" />
                    <span className="text-light-accent opacity-50 dark:text-dark-text">
                      Not Available
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
