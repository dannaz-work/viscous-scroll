import type { NextPage } from "next";
import Head from "next/head";
import { Step2 } from "components/Step2";

const Step2Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Step 2</title>
        <meta name="description" content="Viscous scroll" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Step2 />
      </main>
    </div>
  );
};

export default Step2Page;
