import { useState, useEffect } from "react";
import Head from "next/head";

import Navbar from "../components/Navbar";

export default function Home() {
  const [submitted, setSubmitted] = useState();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [email, setEmail] = useState("");
  const [unitTopic, setUnitTopic] = useState("");
  const [sessionLink, setSessionLink] = useState("");
  const [submissions, setSubmissions] = useState({});

  let partnerLink = "";
  let rows = [];

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

  const getSubmissions = () => {
    fetch("/api/submissions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmissions(res.submissions);
      });
  };

  const submitForm = (event) => {
    event.preventDefault();

    fetch("/api/submissions", {
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
        setSubmissions(res.submissions);
        setSubmitted(true);
        getSubmissions();
      });
  };

  if (submissions) {
    let start = 0;
    for (let i = 0; i < submissions.length - 1; i += 1) {
      if (submissions[i].unitTopic != submissions[i + 1].unitTopic) {
        rows.push(
          <tr key={submissions[i].uid}>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {submissions[i].email}
            </td>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {i == start ? "N/A" : submissions[start].email}
            </td>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {submissions[i].unitTopic}
            </td>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {i == start ? (
                "N/A"
              ) : (
                <a href={submissions[start].sessionLink}>
                  <span className="text-base underline">
                    {submissions[start].sessionLink}
                  </span>
                </a>
              )}
            </td>
          </tr>
        );

        start = i + 1;
      } else {
        rows.push(
          <tr key={submissions[i].uid}>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {submissions[i].email}
            </td>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {submissions[i + 1].email}
            </td>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              {submissions[i].unitTopic}
            </td>
            <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
              <a href={submissions[i + 1].sessionLink}>
                <span className="text-base underline">
                  {" "}
                  {submissions[i + 1].sessionLink}
                </span>
              </a>
            </td>
          </tr>
        );
      }
      if (
        submissions[i].email === email &&
        submissions[i].unitTopic === unitTopic &&
        submissions[i].sessionLink === sessionLink
      ) {
        if (submissions[i + 1].unitTopic == unitTopic) {
          partnerLink = submissions[i + 1].sessionLink;
        } else if (start != i) {
          partnerLink = submissions[start].sessionLink;
        }
      }
    }
  }

  useEffect(() => {
    setSubmissions(getSubmissions());
  }, []);

  return (
    <div className="flex flex-col justify-center min-h-screen ">
      <Head>
        <title>Free Online Tutoring — Schoolhouse</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta
          name="description"
          content="Schoolhouse.world is a free tutoring platform on which anyone can receive live help online. Founded by Sal Khan. Join our welcoming community!"
        ></meta>
        <meta
          property="og:description"
          content="Schoolhouse.world is a free tutoring platform on which anyone can receive live help online. Founded by Sal Khan. Join our welcoming community!"
        ></meta>
        <meta
          name="twitter:description"
          content="Schoolhouse.world is a free tutoring platform on which anyone can receive live help online. Founded by Sal Khan. Join our welcoming community!"
        ></meta>
      </Head>
      <Navbar> </Navbar>
      <main className="relative flex flex-col justify-center flex-1 w-full max-w-5xl px-6 pb-32 mx-auto overflow-x-hidden text-left font-base md:px-20 md:overflow-x-visible ">
        <img
          src={"blob.svg"}
          alt="Submission was successful"
          className="absolute top-0 z-0 rotate-90 -left-24 top-32 w-96 h-96"
        />
        <img
          src={"blob.svg"}
          alt="Submission  was successful"
          className="absolute z-0 rotate-180 top-96 -right-24 w-96 h-96"
        />
        {/* {sortedSubmissions !== "" && <div className="w-64 h-48 bg-black"></div>} */}
        {!submitted ? (
          <>
            <h1 className="z-10 text-3xl font-semibold pt-28 text-start">
              Thank you for completing your recording
            </h1>

            <h2 className="z-10 mt-3 text-xl">
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
            <h1 className="z-10 mt-3 text-3xl font-normal text-left">
              Your submission was recieved!
            </h1>

            <h2 className="z-10 mt-3 text-xl">
              As the final step in the certification process, we’d like to ask
              you to review the submission of one other candidate.{" "}
              {partnerLink === "" ? (
                <>
                  Unfortunately, no submission is currently available for you to
                  review. We will contact you soon with your assignment.
                </>
              ) : (
                <> Please access your candidate assignment below.</>
              )}
            </h2>
          </>
        )}
        {!submitted && (
          <form
            className="z-10 w-full max-w-5xl p-10 mt-10 bg-white border border-4 border-gray-300 rounded rounded-lg"
            onSubmit={submitForm}
          >
            <>
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                    htmlFor="grid-unit-topic"
                  >
                    Unit Topic:
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-unit-topic"
                    name="unitTopic"
                    type="text"
                    onChange={(event) => onChangeHandler(event)}
                    placeholder="Algebra"
                    value={unitTopic}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                    htmlFor="grid-email"
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
                    htmlFor="grid-session-link"
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
              </div>{" "}
            </>

            <div className="flex justify-end w-full">
              <button
                type="button"
                className="justify-end px-8 py-0 text-lg font-semibold text-gray-400 bg-white border-2 border-gray-400 rounded hover:opacity-75"
                onClick={() => clearInputs()}
                aria-label="clear inputs"
              >
                Clear
              </button>
              <button
                className="justify-end py-0 ml-6 text-lg font-semibold text-white rounded bg-base hover:bg-blue-700 px-7"
                aria-label="submit"
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {submitted && partnerLink && (
          <div className="z-10 flex flex-row justify-center mx-4 mt-10">
            <button
              type="button"
              className="justify-end w-48 px-8 py-0 text-lg font-semibold text-gray-400 bg-white border border-2 border-gray-400 rounded hover:opacity-75"
              aria-label="email me"
            >
              <a href={"#email-me"}>Email me</a>
            </button>
            <button
              className="justify-end w-48 py-0 ml-6 text-lg font-semibold text-white rounded bg-base hover:bg-blue-700 px-7"
              aria-label="open link"
            >
              <a href={partnerLink}> Open Link </a>
            </button>{" "}
          </div>
        )}
        <div className="w-full h-[0.15rem] z-10 mt-16 bg-gray-200"></div>
        <div className="z-10 flex flex-row items-center mt-3">
          <h1 className="z-10 font-normal text-gray-500 text-md text-start ">
            Advanced
          </h1>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-label="show advanced"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={
                "w-4 h-4 ml-2 text-gray-500 " + (!showAdvanced && "-rotate-90")
              }
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
          <>
            <h2 className="z-10 mt-4 text-gray-500 text-md">
              This application was architected to optimize the user experience
              for the candidate. In order to capture the complete functionality
              of the application, advanced options are available below that
              would not ordinarily be available to the candidate.
            </h2>

            <div className="z-10 flex flex-col mt-4 border-4 border-gray-300 rounded rounded-lg">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th
                            scope="col"
                            className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Reviewer:
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Reviewee:
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Subject:
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Link:
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rows}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="z-10 mt-4 text-gray-500 text-md">
              The below submission form allows a schoolhouse.world employee to
              manually add unlimitted submissions outside of the candidates'
              view.
            </h2>
            <form
              className="z-10 w-full max-w-5xl p-10 mt-4 bg-white border border-4 border-gray-300 rounded rounded-lg"
              onSubmit={submitForm}
            >
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                    htmlFor="grid-unit-topic"
                  >
                    Unit Topic:
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-unit-topic"
                    name="unitTopic"
                    type="text"
                    onChange={(event) => onChangeHandler(event)}
                    placeholder="Algebra"
                    value={unitTopic}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xl font-semibold tracking-wide text-gray-700"
                    htmlFor="grid-email"
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
                    htmlFor="grid-session-link"
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
                  className="justify-end px-8 py-0 text-lg font-semibold text-gray-400 bg-white border border-2 border-gray-400 rounded hover:opacity-75"
                  onClick={() => clearInputs()}
                  aria-label="clear inputs"
                >
                  Clear
                </button>
                <button
                  className="justify-end py-0 ml-6 text-lg font-semibold text-white rounded bg-base hover:bg-blue-700 px-7"
                  aria-label="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
