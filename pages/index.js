import Head from 'next/head'


import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Jacob</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar> </Navbar>
      <main className="relative flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
       
        <h1 className="text-6xl font-bold">
        Thank you for completing your exam
        </h1>

        <h2 className="mt-3 text-2xl">
        In order to finalsize your submission for certification, please complete the following form with your unit topic, email, and session link (either Loom or another service), and press submit.</h2>

       
        

      </main>
    </div>
  )
}
