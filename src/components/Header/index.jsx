// استيراد المكتبات المطلوبة + اللوغو
import Link from "next/link";
import { AiOutlineMenu, AiOutlineHome, AiOutlineQuestionCircle, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineMedicalServices, MdOutlineContactPhone } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import Logo from "../../../public/images/Logo/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// تعريف دالة مكون الرأس
export default function Header() {
    // تعريف المتغيرات المطلوبة
    const [token, setToken] = useState("");
    const router = useRouter();
    // تعريف دالة لعملية تسجيل الخروج
    const logout = async () => {
        // حذف المفتاح الذي يحوي رقم معرّف المستخدم من التخزين المحلي
        localStorage.removeItem(process.env.userTokenNameInLocalStorage);
        // إعادة تحميل الصفحة بعد االحذف لحذف وإظهار الأزرار المناسبة بناءً على حالة عدم تسجيل الدخول
        await router.push("/login");
    }
    // التصريح عن دالة ال useEffect المطلوبة لجلب رقم معرّف المستخدم عند تحميل الصفحة
    useEffect(() => {
        // جلب معرّف المستخدم من التخزين المحلي
        const userToken = localStorage.getItem(process.env.userTokenNameInLocalStorage);
        if (userToken) {
            // إسناد قيمة الرمز لل state المعرّفة سابقاً
            setToken(userToken);
        }
    }, []);
    return (
        // بداية مكون رأس الصفحة
        <header className="page-header text-white">
            <nav className="navbar navbar-expand-lg pt-3 pb-3">
                {/* بدء مكون الحاوية من البوتستراب */}
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <AiOutlineMenu />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">
                                    <AiOutlineHome />
                                    <span className="me-2">الرئيسية</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/who-are-we">
                                    <AiOutlineQuestionCircle />
                                    <span className="me-2">من نحن</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/our-services">
                                    <MdOutlineMedicalServices />
                                    <span className="me-2">خدماتنا</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/contact-us">
                                    <MdOutlineContactPhone />
                                    <span className="me-2">اتصل بنا</span>
                                </Link>
                            </li>
                            {/* إخفاء أو إظهار أزرار تسجيل الدخول والخروج بناءً على رقم معرّف المستخدم هل هو موجود أم لا */}
                            {!token && <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/login">
                                        <BiLogIn />
                                        <span className="me-2">تسجيل الدخول</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/sign-up">
                                        <AiOutlineUserAdd />
                                        <span className="me-2">إنشاء حساب</span>
                                    </Link>
                                </li>
                            </>}
                            {/* إخفاء أو إظهار أزرار الملف الشخصي الدخول وطلب الخدمة بناءً على رقم معرّف المستخدم هل هو موجود أم لا */}
                            {token && <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/profile">
                                        <CgProfile />
                                        <span className="me-2">الملف  الشخصي</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/service-request">
                                        <MdOutlineMedicalServices />
                                        <span className="me-2">طلب خدمة</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-danger logout-btn"
                                        onClick={logout}
                                    >
                                        <TbLogout />
                                        <span className="me-2">تسجيل الخروج</span>
                                    </button>
                                </li>
                            </>}
                        </ul>
                    </div>
                    <div className="logo-box">
                        <Link className="logo" href="/">
                            <img src={Logo.src} alt="Logo image !!" width="100" height="75" />
                        </Link>
                    </div>
                </div>
                {/* نهاية مكون الحاوية من البوتستراب  */}
            </nav>
        </header>
        // نهاية مكون رأس الصفحة
    );
} 