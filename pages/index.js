import Head from "next/head";

import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <Head>
        <title>C</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar> </Navbar>
      <main className="relative flex flex-col justify-center flex-1 w-full max-w-5xl px-20 pb-32 mx-auto text-left ">
        <h1 className="pt-24 text-3xl font-normal text-start">
          Thank you for completing your exam
        </h1>

        <h2 className="mt-3 text-xl">
          In order to finalsize your submission for certification, please
          complete the following form with your unit topic, email, and session
          link (either Loom or another service), and press submit.
        </h2>

        <form class="w-full max-w-5xl mt-10 border rounded rounded-lg border-4 border-gray-300 p-10">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block tracking-wide text-gray-700 text-xl font-semibold mb-2"
                for="grid-unit-topic"
              >
                Unit Topic:
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-unit-topic"
                type="text"
                placeholder="Algebra"
              />
              <p class="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block tracking-wide text-gray-700 text-xl font-semibold mb-2"
                for="grid-email"
              >
                Email:
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="text"
                placeholder="sal@schoolhouse.world"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block tracking-wide text-gray-700 text-xl font-semibold mb-2"
                for="grid-session-link"
              >
                Session Link:
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-session-link"
                type="url"
                placeholder="https://loom.com/a"
              />
              <p class="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
          </div>
          <div class="flex justify-end w-full">
            <button class="bg-white justify-end hover:opacity-75 text-gray-400 text-lg border border-2 border-gray-400 font-bold py-0 px-8 rounded">
              Clear
            </button>
            <button class="bg-base justify-end ml-6 hover:bg-blue-700 text-white text-lg font-semibold py-0 px-6 rounded">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
