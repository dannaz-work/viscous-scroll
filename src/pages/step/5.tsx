import type { NextPage } from "next";
import Head from "next/head";
import { Step5 } from "components/Step5";

const Step3Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Step 5</title>
        <meta name="description" content="Viscous scroll" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Step5 />
      </main>
    </div>
  );
};

export default Step3Page;
