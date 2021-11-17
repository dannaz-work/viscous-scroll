import type { NextPage } from "next";
import Head from "next/head";
import { Step4 } from "components/Step4";

const Step3Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Step 4</title>
        <meta name="description" content="Viscous scroll" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Step4 />
      </main>
    </div>
  );
};

export default Step3Page;
