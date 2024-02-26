
'use client'
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Help = () => {
  const [help, setHelp] = useState("");
  const [reloadHelp, setReloadHelp] = useState(false);

  const { user } = useUser();
  
  // Fetching help requests
  useEffect(() => {
    const fetchHelp = async () => {
      const response = await fetch(`/api/help`);
      const data = await response.json();
      setHelp(data);
    };
    if (user && user.id != "undefined") {
      fetchHelp();
    }
  }, [user, reloadHelp]);

  return (
    <div className="bg-white">
      <div className="relative isolate px-5 pt-5 lg:px-8">
        <div
          className="absolute inset-x1 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(51%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(75.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              src="/img/icons/icon-511x512.png"
              alt="Campus Quest Icon"
              width={41}
              height={51}
              className="icon"
            />
          </div>
          <div className="flex items-center userbtn">
            <UserButton />
          </div>
          <div
            className="absolute inset-x1 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(51%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(75.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div className="mx-auto max-w-1xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <ul
              role="list"
              className="grid grid-cols0 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.isArray(help) ? (
                help.map((help) => (
                  <li
                    key={help._id}
                    className="col-span0 divide-y divide-gray-200 rounded-lg bg-white shadow"
                  >
                    <div className="flex w-full items-center justify-between space-x-5 p-6">
                      <div className="flex0 truncate">
                        <div className="flex items-center space-x-2">
                          <h4 className="truncate text-sm font-medium text-gray-900">
                            {help.title}
                          </h4>
                        </div>
                        <span className="inline-flex flex-shrink1 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-inset ring-green-600/20">
                          {help.description ? "Completed" : "Not completed"}
                        </span>
                        <p className="mt0 truncate text-sm text-gray-500">
                          {help.user}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="fixed top1 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                  <div className="loader ease-linear rounded-full border-3 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                  <h3 className="text-center text-white text-xl font-semibold">
                    Loading...
                  </h3>
                  <p className="w0/3 text-center text-white">
                    The help requests are loading, this may take a few seconds, please
                    don&apos;t close this page.
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div
          className="absolute inset-x1 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(51%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(75.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Help;
