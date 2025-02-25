import Link from "next/link";
import * as React from "react";
import { AttentionSeeker } from "react-awesome-reveal";

export default async ({ hasDisp, crowdSourcing = false }) => {
  let layoutClass = "grid-cols-2";

  if (hasDisp) {
    layoutClass = "grid-cols-3";
  }

  if (crowdSourcing) {
    layoutClass = "grid-cols-4";
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
      <div
        className={`grid h-full max-w-lg mx-auto font-medium ${layoutClass}`}
      >
        <Link
          href="/driver-panel/preferencias"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
        >
          <svg
            className="w-5 h-5 mb-2 text-gray-500  group-hover:text-primary "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg>
          <span className="text-sm text-gray-500  group-hover:text-primary ">
            Preferências
          </span>
        </Link>
        {crowdSourcing ? (
          <Link
            href="/driver-panel/crowdsourcing"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
          >
            <div className="relative">
              <span className="absolute flex size-3 tip-0 -left-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
              <svg
                className="w-6 h-5 mb-2 text-gray-500  group-hover:text-primary "
                viewBox="2 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
            </div>

            <span className="text-sm text-primary ">Rotas</span>
          </Link>
        ) : null}

        <Link
          href="/driver-panel"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <svg
            className="w-5 h-5 mb-2 text-gray-500 group-hover:text-primary "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="text-sm text-gray-500  group-hover:text-primary ">
            Início
          </span>
        </Link>
        {hasDisp ? (
          <Link
            href="/driver-panel/disponibilidade"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <svg
              className="w-5 h-5 mb-2 text-gray-500  group-hover:text-primary "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-sm text-gray-500  group-hover:text-primary">
              Agenda
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
