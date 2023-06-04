import Script from "next/script";
import Head from "next/head";
import "../Scss/index.css";
import "../components/Header/index.css";
import "../pages/index.css";
import "../pages/login/index.css";
import "./sign-up/index.css";
import "./contact-us/index.css";
import "./our-services/index.css";
import "./service-request/index.css";
import "./forget-password/index.css";
import "./reset-password/index.css";
import "./profile/index.css";
import "./dashboard/admin/login/index.css";
import "./dashboard/admin/admin-panel/index.css";
import "./dashboard/admin/admin-panel/requests-manager/index.css";
import "./dashboard/admin/admin-panel/passwords-reset/index.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Start Include Bootstrap Framework Css File */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        {/* End Include Bootstrap Framework Css File */}
        {/* Start Include Fonts From Google Fonts Website */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lemonada:wght@300;400;500&display=swap" rel="stylesheet" />
        {/* End Include Fonts From Google Fonts Website */}
      </Head>
      <Component {...pageProps} />
      {/* <Footer /> */}
      {/* Start Include Bootstrap Framework Js File */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      ></Script>
      {/* End Include Bootstrap Framework Js File */}
    </>
  );
}
