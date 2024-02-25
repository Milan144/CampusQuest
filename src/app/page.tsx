"use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import Scanner from "./components/scanner";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useGeolocated } from "react-geolocated";

const App = () => {
  const [locationValid, setLocationValid] = useState(false);
  const [quests, setQuests] = useState("");
  const [user, setUser] = useState<User | string>("");  

  interface User {
    id: string;
    firstName: string;
  }

  useEffect(() => {
    fetch("/api/quests")
      .then((response) => response.json())
      .then((json) => setQuests(json));
  }, []);

  useEffect(() => {
    fetch("/api/user")
      .then((response) => response.json())
      .then((json) => setUser(json));
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    const handleCompleteQuest = async () => {
      if (!isGeolocationAvailable || !isGeolocationEnabled || coords == null) {
        console.error("Geolocation not available or not enabled");
        // TODO: Show error popup
        return;
      }

      //const schoolLocation = { lat: 49.2008356, lng: -0.3501047 };
      const schoolLocation = { lat: 49.183289, lng: -0.405666 };

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
      console.info(
        isLocationValid ? "Location is valid" : "Location is invalid"
      );
      setLocationValid(isLocationValid);
    };

    handleCompleteQuest();
  }, [isGeolocationAvailable, isGeolocationEnabled, coords]);

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
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center"> 
          <div>
              {user && typeof user === 'object' && user.id && (
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome, {user.firstName}!
                </h2>
              )}
            </div>
            <div className="scanner">
              {/* {locationValid ? ( */}
              {/*   <div className="flex flex-col items-center justify-center"> */}
              {/*     <h1>QR SCANNER</h1> */}
              {/*     <Scanner /> */}
              {/*   </div> */}
              {/* ) : ( */}
              {/*   <div className="flex items-center justify-center"> */}
              {/*     <p className="text-2xl font-bold text-gray-900"> */}
              {/*       You must be at school to scan QR codes! */}
              {/*     </p> */}
              {/*   </div> */}
              {/* )} */}
              <Scanner/>
            </div>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.isArray(quests) &&
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
                          Completed
                        </span>
                        <p className="mt-1 truncate text-sm text-gray-500">
                          {quest.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
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
