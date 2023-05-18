import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import { MdOutlineLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Logo from "../../../public/images/Logo/logo.png";

export default function Header() {
    return (
        <header className="page-header text-white">
            <nav className="navbar navbar-expand-lg pt-3 pb-3">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">الرئيسية</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/who-are-we">من نحن</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/our-services">خدماتنا</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/contact-us">اتصل بنا</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/login">تسجيل  الدخول</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/sign-up">إنشاء  حساب</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/profile">الملف  الشخصي</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/service-request">طلب خدمة</Link>
                            </li>
                        </ul>
                    </div>
                    <Link className="logo" href="/">
                        <img src={Logo.src} alt="Logo image !!" width="100" height="75" />
                    </Link>
                </div>
            </nav>
        </header>
    );
} 