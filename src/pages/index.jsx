import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import sliderImage1 from "../../public/images/Home/slider1.png";
import sliderImage2 from "../../public/images/Home/slider2.png";
import sliderImage3 from "../../public/images/Home/slider3.png";
import Link from 'next/link';

export default function Home() {

  useEffect(() => {

    let header = document.querySelector("#__next .page-header"),
      pageContent = document.querySelector(".home .page-content");

    pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;

  }, []);

  return (
    // Start Home Page
    <div className="home">
      <Head>
        <title>Mr. Fix - Home</title>
      </Head>
      <Header />
      {/* Start Page Content Section */}
      <div className="page-content">
        {/* Start Slider Section */}
        <section className="slider">
          <span>Slider</span>
          <Link href="/" className='d-block mt-3 btn mx-auto start-with-us-btn pt-2 pe-5 ps-5'>إبدأ معنا</Link>
        </section>
        {/* End Slider Section */}
      </div>
      {/* End Page Content Section */}
    </div>
    // End Home Page
  );
}
