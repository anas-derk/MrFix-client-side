import Link from "next/link";
import { AiOutlineMenu, AiOutlineHome, AiOutlineQuestionCircle, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineMedicalServices, MdOutlineContactPhone } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import Logo from "../../../public/images/Logo/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
    const [userId, setUserId] = useState("");
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("mr-fix-user-id");
        router.reload();
    }
    useEffect(() => {
        let userId = localStorage.getItem("mr-fix-user-id");
        setUserId(userId);
    }, []);
    return (
        // Start Page Header
        <header className="page-header text-white">
            <nav className="navbar navbar-expand-lg pt-3 pb-3">
                {/* Start Container Component From Bootstrap */}
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
                            {!userId && <>
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
                            {userId && <>
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
                                        className="nav-link btn btn-danger"
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
                {/* End Container Component From Bootstrap */}
            </nav>
        </header>
        // End Page Header
    );
} 