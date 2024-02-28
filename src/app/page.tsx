"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import Scanner from "./components/scanner";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useGeolocated } from "react-geolocated";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [quests, setQuests] = useState("");
  const [reloadQuests, setReloadQuests] = useState(false);
  // Getting the user
  const { user } = useUser();

  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("/data-service-worker.js")
        .then(function (registration) {
          console.info(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        });
    });
  }

  // Notifications
  const notifyLocationUnavailable = () =>
    toast("Geolocation not available or not enabled");
  const notifyLocation = () => toast("You must be at school to scan QR codes!");
  const notifyHalf = () => toast("You have completed half of the quests!");
  const notifyFull = () => toast("You have completed all the quests!");
  const notifyValidated = () => toast("The quest has been validated!");

  interface quest {
    id: string;
    name: string;
    description: string;
    completed: boolean;
  }

  // Fetching quests
  useEffect(() => {
    const fetchQuests = async () => {
      const response = await fetch(`/api/quests?userId=${user?.id}`);
      const data = await response.json();
      setQuests(data);
      // If 5 or 10 quests have been completed we show a notification
      let completed = 0;
      data.forEach((quest: quest) => {
        if (quest.completed) {
          completed++;
        }
      });
      if (completed === 5) notifyHalf();
      if (completed === 10) notifyFull();
    };
    if (user && user.id != "undefined") {
      fetchQuests();
    }
  }, [user, reloadQuests]);

  // Checking if the user as activated the geolocation
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  // Checking if the user is at school (return bool)
  const checkLocation = async () => {
    if (!isGeolocationAvailable || !isGeolocationEnabled || coords == null) {
      console.error("Geolocation not available or not enabled");
      notifyLocationUnavailable();
      return;
    }

    const schollLocation = { lat: 49.20077497943215, lng: -0.3500420215185125 };

    // Convert to radians
    const lat1 = (schoolLocation.lat * Math.PI) / 180;
    const lng1 = (schoolLocation.lng * Math.PI) / 180;
    const lat2 = (coords.latitude * Math.PI) / 180;
    const lng2 = (coords.longitude * Math.PI) / 180;

    // Haversine formula
    const dlat = lat2 - lat1;
    const dlng = lng2 - lng1;
    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Earth radius in km
    const R = 6371;

    // Distance in km
    const distance = R * c;

    // If the user is in a 1km circle around the school location
    const isLocationValid = distance <= 1;
    console.info(isLocationValid ? "Location is valid" : "Location is invalid");
    return isLocationValid;
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-5 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              src="/img/icons/icon-512x512.png"
              alt="Campus Quest Icon"
              width={40}
              height={50}
              className="icon"
            />
          </div>
          <div className="flex items-center userbtn">
            <UserButton />
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <ToastContainer />
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <div>
              {user && typeof user === "object" && user.id && (
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome, {user.firstName}!
                </h2>
              )}
            </div>
            <br />
            <div className="flex justify-between">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
                onClick={() => window.location.replace("/share")}
              >
                Share
              </button>
              <button
                type="submit"
                className="text-white bg-orange-500 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-blue-800"
                onClick={() => window.location.replace("/help")}
              >
                Help
              </button>
            </div>
            <br />
            <button
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={ () => {
                  setShowModal(true);
              }}
            >

              SCAN A QR CODE
            </button>
            <br />
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          QR CODE SCANNER
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      <div className="relative p-6 flex-auto">
                        {user && typeof user === "object" && user.id && (
                          <div className="scanner">
                            <Scanner
                              user={user}
                              onQuestCompleted={() =>
                                setReloadQuests((prev) => !prev)
                              }
                              onQuestValidated={() => notifyValidated()}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.isArray(quests) && quests.length > 0 ? (
                quests.map((quest) => (
                  <li
                    key={quest.code}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-sm font-medium text-gray-900">
                            {quest.name}
                          </h3>
                        </div>
                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-green-600/20">
                          {quest.completed ? "Completed" : "Not completed"}
                        </span>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          {quest.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                  <h2 className="text-center text-white text-xl font-semibold">
                    Loading...
                  </h2>
                  <p className="w-1/3 text-center text-white">
                    The quests are loading, this may take a few seconds, please
                    don&apos;t close this page.
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
