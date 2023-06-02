import Head from 'next/head';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import sliderImage1 from "../../public/images/Home/slider1.png";
import sliderImage2 from "../../public/images/Home/slider2.png";
import sliderImage3 from "../../public/images/Home/slider3.png";
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    initialSlide: 2,
    // autoplay: true,
  };
  useEffect(() => {

    let header = document.querySelector("#__next .page-header"),
      pageContent = document.querySelector(".home .page-content"),
      ads = document.querySelector(".home .ads"),
      introduction = document.querySelector(".home .introduction");

    pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
    introduction.style.minHeight = `calc(100vh - (${header.clientHeight}px + ${ads.clientHeight}px))`;

  }, []);

  return (
    // Start Home Page
    <div className="home">
      <Head>
        <title>مستر فيكس - الصفحة الرئيسية</title>
      </Head>
      <Header />
      {/* Start Page Content Section */}
      <div className="page-content pb-3">
        {/* Start Ads Section */}
        <section className="ads text-center p-3">
          <p className='m-0'>شريط الإعلانات</p>
        </section>
        {/* End Ads Section */}
        {/* Start Introduction Section */}
        <section className="introduction">
          {/* Start Slider */}
          <div className="slider">
            <div className="container">
              <Slider {...settings}>
                <div className='slide pt-5 pb-5'>
                  {/* Start Grid System */}
                  <div className="row align-items-center">
                    {/* Start Column */}
                    <div className="col-md-5 content-box">
                      <div className='slider-content-explain text-center'>
                        <p>المنزل هو كل الأشياء الرائعة</p>
                        <p className='pe-2 ps-2 exeption-paragraph'>دعنا نساعدك في تنظيم كل شيء في المنزل و تبسيط جميع الأمور المتعلقة بالمنزل وتغطية احتياجات الصيانة</p>
                      </div>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-7 image-box">
                      <img src={sliderImage1.src} alt="Slider Image 1" className='slider-image slider-image-1' />
                    </div>
                    {/* End Column */}
                  </div>
                  {/* End Grid System */}
                </div>
                <div className='slide pt-5 pb-5'>
                  {/* Start Grid System */}
                  <div className="row align-items-center">
                    {/* Start Column */}
                    <div className="col-md-5 content-box custom-mobile">
                      <div className='slider-content-explain text-center'>
                        <p>أعتني بمنزلك من خلال هاتفك</p>
                        <p>معًا، سنعمل على صيانة منزلك  والمحافظة عليه من خلال موقع بسيط</p>
                        <p>يتيح مستر فيكس إصلاح وصيانة جميع ما يحتاجه منزلك في مكان واحد</p>
                      </div>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-7 image-box">
                      <img src={sliderImage2.src} alt="Slider Image 2" className='slider-image slider-image-2 ' />
                    </div>
                    {/* End Column */}
                  </div>
                  {/* End Grid System */}
                </div>
                <div className='slide pt-5 pb-5'>
                  {/* Start Grid System */}
                  <div className="row align-items-center">
                    {/* Start Column */}
                    <div className="col-md-5 content-box">
                      <div className='slider-content-explain text-center'>
                        <p className='exeption-paragraph-3'>نحاول أن نبسط الأمور، ونرغب في أن نكون جزءَ في تخفيف الأعباء وتوفير الأمان و الراحة بشكل دائم</p>
                        <p>نريد منك أن تفكر فينا كشريك موثوق به</p>
                        <p>دعنا نحافظ على ابتسامتك</p>
                      </div>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-7 image-box">
                      <img src={sliderImage3.src} alt="Slider Image 3" className='slider-image slider-image-3' />
                    </div>
                    {/* End Column */}
                  </div>
                  {/* End Grid System */}
                </div>
              </Slider>
            </div>
          </div>
          {/* End Slider */}
          {/* Start Start With Us Box */}
          <div className="start-with-us-box">
            <Link href="/sign-up" className='d-block mt-3 btn mx-auto start-with-us-btn pt-2 pe-5 ps-5'>إبدأ معنا</Link>
          </div>
          {/* End Start With Us Box */}
        </section>
        {/* End Introduction Section */}
      </div>
      {/* End Page Content Section */}
    </div>
    // End Home Page
  );
}
