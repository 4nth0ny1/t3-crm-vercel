import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [calls, setTotalCalls] = useState(0);
  const { data: sessionData } = useSession();

  const { data: companies } = api.company.getAllCompanies.useQuery();

  useEffect(() => {
    let total = 0;
    companies?.map((company) => {
      total += company.attempts.length;
    });
    setTotalCalls(total);
  }, [companies]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!sessionData && (
        <main className="flex h-screen flex-row">
          <div className="w-1/2">
            <img src="/city.png" alt="city.png" className="h-full w-full" />
          </div>
          <div className="flex w-1/2 flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-bold">T3 CRM</h1>
            <h2 className="w-3/4 text-center text-2xl italic">
              The simplest way to stay in touch with your customers and achieve
              your goals.
            </h2>
            <p className="text-xl">
              Please sign in with one of the two options ...
            </p>
            <div className="flex flex-row gap-12">
              <button className="text-5xl" onClick={() => signIn("google")}>
                <FcGoogle />
              </button>
              <button className="text-5xl" onClick={() => signIn("github")}>
                <FiGithub />
              </button>
            </div>
          </div>
        </main>
      )}
      {sessionData && (
        <main className="px-8">
          <Navbar />
          <h2>Dashboard</h2>
          <div className="flex flex-col gap-2 bg-base-200 p-4">
            <div className="flex flex-row items-center gap-8">
              <h2>calls</h2>
              <progress
                className="progress progress-primary w-56"
                value={calls}
                max="60"
              ></progress>
              <p>{calls}</p>
            </div>
            <div className="flex flex-row items-center gap-8">
              <h2>opportunities</h2>
              <progress
                className="progress progress-primary w-56"
                value={34}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-row items-center gap-8">
              <h2>contacts</h2>
              <progress
                className="progress progress-primary w-56"
                value={34}
                max="100"
              ></progress>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
