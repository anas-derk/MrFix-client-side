// استيراد المكتبات المطلوبة + الصور الخاصة بالصفحة الرئيسية
import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from 'react';
import sliderImage1 from "../../public/images/Home/slider1.png";
import sliderImage2 from "../../public/images/Home/slider2.png";
import sliderImage3 from "../../public/images/Home/slider3.png";
import Link from "next/link";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getUserInfo } from "../../public/global_functions/popular";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

// تعريف دالة الصفحة الرئيسية 
export default function Home({ result }) {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);
  // تعريف معرّف المستخدم كـ state
  const [token, setToken] = useState("");
  // تعريف دالة ال useEffect لعمل أشياء ما عند تحميل الصفحة
  useEffect(() => {
    if (!isLoadingPage) {
      // جلب بعض العناصر من صفحة الويب باستخدام الجافا سكربت
      const header = document.querySelector("#__next .page-header"),
        pageContent = document.querySelector(".home .page-content"),
        ads = document.querySelector(".home .ads"),
        introduction = document.querySelector(".home .introduction");
      // جعل أقل ارتفاع لعنصر pageContent هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة
      pageContent.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
      // جعل أقل ارتفاع لعنصر introduction هو عرض الصفحة المرأية كاملةً منقوصاً منها ارتفاع عنصر رأس الصفحة + ارتفاع عنصر الإعلانات
      introduction.style.minHeight = `calc(100vh - (${header.clientHeight}px + ${ads.clientHeight}px))`;
    }
  }, [isLoadingPage]);
  useEffect(() => {
    const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
    if (userToken) {
        getUserInfo()
            .then(async (result) => {
                setIsLoadingPage(false);
                if (result.error) {
                    localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                } else {
                  setToken(userToken);
                }
            })
            .catch(async (err) => {
                setIsLoadingPage(false);
                if (err?.response?.data?.msg === "Unauthorized Error") {
                    localStorage.removeItem(process.env.userTokenNameInLocalStorage);
                } else {
                    setIsErrorMsgOnLoadingThePage(true);
                }
            });
    } else {
        setIsLoadingPage(false);
    }
}, []);
  return (
    // بداية كتابة كود ال jsx للصفحة الرئيسية
    <div className="home">
      {/* بداية كتابة معلومات عنصر ال head في ال html */}
      <Head>
        <title>مستر فيكس - الصفحة الرئيسية</title>
      </Head>
      {/* نهاية كتابة معلومات عنصر ال head في ال html */}
      {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
        {/* بداية عرض مكون الرأس الذي أنشأناه */}
        <Header />
        {/* نهاية عرض مكون الرأس الذي أنشأناه */}
        {/* بداية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
        <div className="page-content pb-3">
          {/* بداية كتابة كود ال jsx عنصر الإعلانات */}
          <section className="ads text-center p-3">
            {result.length === 0 && <p className='m-0'>شريط الإعلانات</p>}
            {result.length > 0 && <Carousel indicators={false} controls={false}>
              {result.map((ads, index) => (
                <Carousel.Item key={index}>
                  <Carousel.Caption>
                    <Link href="/ads" className='text-white'>
                      <p className='ads-content'>{ads.content}</p>
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            }
          </section>
          {/* نهاية كتابة كود ال jsx عنصر الإعلانات */}
          {/* بداية كتابة كود ال jsx عنصر المدخل */}
          <section className="introduction">
            {/* بداية كتابة كود ال jsx عنصر السلايدر */}
            <Carousel
              indicators={false}
              controls={true}
              prevIcon={<IoIosArrowBack className='slider-control-icon arrow-left-icon' />}
              nextIcon={<IoIosArrowForward className='slider-control-icon arrow-right-icon' />}
            >
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="container">
                    {/* بداية مكون الشبكة من البوتستراب */}
                    <div className="row align-items-center justify-content-center">
                      {/* بداية مكون العمود */}
                      <div className="col-md-5 content-box">
                        <div className='slider-content-explain text-center'>
                          <p className='pe-2 ps-2 exeption-paragraph'>دعنا نساعدك في تنظيم كل شيء في المنزل و تبسيط جميع الأمور المتعلقة بالمنزل وتغطية احتياجات الصيانة</p>
                        </div>
                      </div>
                      {/* نهاية مكون العمود */}
                      {/* بداية مكون العمود */}
                      <div className="col-md-7 image-box image-box1">
                        <p className='text-center home-paragraph'>المنزل هو كل الأشياء الرائعة</p>
                        <img src={sliderImage1.src} alt="Slider Image 1" className='slider-image slider-image-1' />
                      </div>
                      {/* نهاية مكون العمود */}
                    </div>
                    {/* نهاية مكون الشبكة من البوتستراب */}
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="container">
                    {/* بداية مكون الشبكة من البوتستراب */}
                    <div className="row align-items-center">
                      {/* بداية مكون العمود */}
                      <div className="col-md-5 content-box custom-mobile">
                        <div className='slider-content-explain text-center'>
                          <p>معًا، سنعمل على صيانة منزلك  والمحافظة عليه من خلال موقع بسيط حيث يتيح مستر فيكس إصلاح وصيانة جميع ما يحتاجه منزلك في مكان واحد</p>
                        </div>
                      </div>
                      {/* نهاية مكون العمود */}
                      {/* بداية مكون العمود */}
                      <div className="col-md-7 image-box image-box2">
                        <p className='home-paragraph'>أعتني بمنزلك من خلال هاتفك</p>
                        <img src={sliderImage2.src} alt="Slider Image 2" className='slider-image slider-image-2 ' />
                      </div>
                      {/* نهاية مكون العمود */}
                    </div>
                    {/* نهاية مكون الشبكة من البوتستراب */}
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Carousel.Caption>
                  <div className="container">
                    {/* بداية مكون الشبكة من البوتستراب */}
                    <div className="row align-items-center">
                      {/* بداية مكون العمود */}
                      <div className="col-md-5 content-box">
                        <div className='slider-content-explain text-center'>
                          <p className='exeption-paragraph-3'>نبسط الأمور، ونرغب في أن نكون جزءَ في تخفيف الأعباء وتوفير الأمان والراحة بشكل دائم لذا نريد منك أن تفكر فينا كشريك موثوق به</p>
                        </div>
                      </div>
                      {/* نهاية مكون العمود */}
                      {/* بداية مكون العمود */}
                      <div className="col-md-7 image-box image-box3">
                        <p className='home-paragraph'>دعنا نحافظ على ابتسامتك</p>
                        <img src={sliderImage3.src} alt="Slider Image 3" className='slider-image slider-image-3' />
                      </div>
                      {/* نهاية مكون العمود */}
                    </div>
                    {/* نهاية مكون الشبكة من البوتستراب */}
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            {/* نهاية كتابة كود ال jsx عنصر السلايدر */}
            {/* بداية كتابة كود ال jsx عنصر الرابط الخاص بصفحة إنشاء حساب */}
            {/* نعرضه في حالة لم يكن يوجد معرّف للمستخدم */}
            {!token && <Link href="/sign-up" className='d-block btn start-with-us-btn mt-3 mx-auto pt-2 pe-5 ps-5'>
              <span>إبدأ معنا</span>
            </Link>}
            {/* نهاية كتابة كود ال jsx عنصر الرابط الخاص بصفحة إنشاء حساب */}
            {/* بداية كتابة كود ال jsx عنصر الرابط الخاص بصفحة طلب خدمة */}
            {token && <Link className='d-block btn service-request-btn mt-3 mx-auto pt-2 pe-5 ps-5' href="/service-request">
              <span className='ms-2'>طلب خدمة</span>
            </Link>}
            {/* نهاية كتابة كود ال jsx عنصر الرابط الخاص بصفحة طلب خدمة */}
          </section>
          {/* نهاية كتابة كود ال jsx عنصر المدخل */}
        </div>
        {/* نهاية كتابة كود ال jsx لعنصر ال html المسمى page-content */}
      </>}
      {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
      {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
    </div >
    // نهاية كتابة كود ال jsx للصفحة الرئيسية
  );
}

// تعريف دالة getServerSideProps لجلب بيانات كل الإعلانات في جهة الخادم وليس من جانب المتصفح
export async function getServerSideProps() {
  let res = await axios.get(`${process.env.BASE_API_URL}/ads/all-ads`);
  let result = res.data;
  return {
    props: { result },
  };
}