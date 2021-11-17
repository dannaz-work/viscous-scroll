import type { NextPage } from "next";
import Head from "next/head";
import { Step1 } from "components/Step1";

const Step1Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Step 1</title>
        <meta name="description" content="Viscous scroll" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Step1 />
      </main>
    </div>
  );
};

export default Step1Page;
