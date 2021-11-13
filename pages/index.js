import { useState, useEffect } from "react";
import Head from "next/head";

import Navbar from "../components/Navbar";

export default function Home() {
  const [submitted, setSubmitted] = useState();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [email, setEmail] = useState("");
  const [unitTopic, setUnitTopic] = useState("");
  const [sessionLink, setSessionLink] = useState("");

  useEffect(() => {
    console.log(email);
  }, [email]);

  const clearInputs = () => {
    setEmail("");
    setUnitTopic("");
    setSessionLink("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    } else if (name === "unitTopic") {
      setUnitTopic(value);
    } else if (name === "sessionLink") {
      setSessionLink(value);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    console.log("email is " + email);
    console.log("unitTopic is " + unitTopic);
    console.log("sessionLink is " + sessionLink);

    fetch("/api/videoSubmission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        unitTopic: unitTopic,
        sessionLink: sessionLink,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSubmitted(true);
      });
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Head>
        <title>Free Online Tutoring — Schoolhouse</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/MuseoSansRounded"
          as="font"
          crossOrigin=""
        />
      </Head>
      <Navbar> </Navbar>
      <main className="relative flex flex-col justify-center flex-1 w-full max-w-5xl px-20 pb-32 mx-auto text-left ">
        {!submitted ? (
          <>
            <h1 className="pt-24 text-3xl font-normal text-start">
              Thank you for completing your exam
            </h1>

            <h2 className="mt-3 text-xl">
              In order to finalize your submission for certification, please
              complete the following form with your unit topic, email, and
              session link (either Loom or another service), and press submit.
            </h2>
          </>
        ) : (
          <>
            <img
              src={"success.svg"}
              alt="Submission was successful"
              className="w-16 h-16 mx-auto mt-8"
            />
            <h1 className="mt-3 text-3xl font-normal text-left">
              Your submission was recieved!
            </h1>

            <h2 className="mt-3 text-xl">
              As the final step in the certification process, we’d like to ask
              you to review the submission of one other candidate. Please see
              your candidate assignment below.
            </h2>
          </>
        )}

        <form
          className="w-full max-w-5xl p-10 mt-10 border border-4 border-gray-300 rounded rounded-lg"
          onSubmit={submitForm}
        >
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <label
                className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                for="grid-unit-topic"
              >
                Unit Topic:
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white"
                id="grid-unit-topic"
                name="unitTopic"
                type="text"
                onChange={(event) => onChangeHandler(event)}
                placeholder="Algebra"
                value={unitTopic}
              />
              <p className="text-xs italic text-red-500">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <label
                className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                for="grid-email"
              >
                Email:
              </label>
              <input
                className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                onChange={(event) => onChangeHandler(event)}
                value={email}
                name="email"
                type="text"
                placeholder="sal@schoolhouse.world"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                for="grid-session-link"
              >
                Session Link:
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-session-link"
                type="url"
                value={sessionLink}
                onChange={(event) => onChangeHandler(event)}
                name="sessionLink"
                placeholder="https://loom.com/a"
              />
            </div>
          </div>
          <div className="flex justify-end w-full">
            <button
              type="button"
              className="justify-end px-8 py-0 text-lg font-bold text-gray-400 bg-white border border-2 border-gray-400 rounded hover:opacity-75"
              onClick={() => clearInputs()}
            >
              Clear
            </button>
            <button className="justify-end py-0 ml-6 text-lg font-semibold text-white rounded bg-base hover:bg-blue-700 px-7">
              Submit
            </button>
          </div>
        </form>
        <div className="w-full h-[0.15rem] mt-16 bg-gray-200"></div>
        <div className="flex flex-row items-center mt-3">
          <h1 className="font-normal text-gray-500 text-md text-start ">
            Advanced
          </h1>
          <button onClick={() => setShowAdvanced(!showAdvanced)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={"w-4 h-4 ml-2 text-gray-500 " + (showAdvanced && "-rotate-90" )}
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
          </button>
        </div>
        {showAdvanced && (
          <h2 className="mt-3 text-gray-500 text-md">
            This application was architected to optimize the user experience for
            the candidate. In order to capture the complete functionality of the
            application, advanced options are available below that would not
            ordinarily be available to the candidate.
          </h2>
        )}
      </main>
    </div>
  );
}
