import { MdOutlineLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import Link from "next/link";

export default function SideBar() {
    return (
        // Start Side Bar
        <aside className="side-bar p-3">
            <ul className="links-list d-flex flex-column">
                <li className="text-center">
                    القائمة الرئيسية
                </li>
                <hr />
                <li className="p-2">
                    <Link href="/">
                        <FiUserPlus className="home-page-icon ms-3" />
                        <span>الصفحة الرئيسية</span>
                    </Link>
                </li>
                <li className="p-2">
                    <Link href="/sign-up">
                        <FiUserPlus className="signup-icon ms-3" />
                        <span>حساب جديد</span>
                    </Link>
                </li>
                <li className="p-2">
                    <Link href="/login">
                        <MdOutlineLogin className="login-icon ms-3" />
                        <span>تسجيل الدخول</span>
                    </Link>
                </li>
                <li className="p-2">
                    <Link href="/who-are-we">
                        <MdOutlineLogin className="login-icon ms-3" />
                        <span>من نحن</span>
                    </Link>
                </li>
                <li className="p-2">
                    <Link href="/our-services">
                        <MdOutlineLogin className="login-icon ms-3" />
                        <span>خدماتنا</span>
                    </Link>
                </li>
                <li className="p-2">
                    <Link href="/contact-us">
                        <MdOutlineLogin className="login-icon ms-3" />
                        <span>اتصل بنا</span>
                    </Link>
                </li>
            </ul>
        </aside>
        // End Side Bar
    );
}