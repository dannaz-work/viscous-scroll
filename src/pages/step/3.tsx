import type { NextPage } from "next";
import Head from "next/head";
import { Step3 } from "components/Step3";

const Step3Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Step 3</title>
        <meta name="description" content="Viscous scroll" />{" "}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Step3 />
      </main>
    </div>
  );
};

export default Step3Page;
