import Link from "next/link";
import { HiOutlineMenu } from "react-icons/hi";
import { MdOutlineLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import Logo from "../../../public/images/Logo/logo.png";

let isSideBarAppearedTemp = false;

export default function Header({ setIsSideBarAppeared }) {
    return (
        <header className="page-header pt-3 pb-2 text-white">
            {/* Start Container From Bootstrap */}
            <div className="container">
                {/* Start Grid System From Bootstrap */}
                <div className="row align-items-center">
                    {/* Start Column From Bootstrap */}
                    <div className="col-md-4">
                        {!isSideBarAppearedTemp && <HiOutlineMenu
                            className="outline-menu-icon"
                            onClick={() => {
                                isSideBarAppearedTemp = !isSideBarAppearedTemp;
                                setIsSideBarAppeared(isSideBarAppearedTemp);
                            }}
                        />}
                        {isSideBarAppearedTemp && <AiOutlineCloseSquare
                            className="outline-menu-close-icon"
                            onClick={() => {
                                isSideBarAppearedTemp = !isSideBarAppearedTemp;
                                setIsSideBarAppeared(isSideBarAppearedTemp);
                            }}
                        />}
                    </div>
                    {/* End Column From Bootstrap */}
                    {/* Start Column From Bootstrap */}
                    <div className="col-md-4 text-center">
                        <img src={Logo.src} alt="Logo !!" width="100" height="70" />
                    </div>
                    {/* End Column From Bootstrap */}
                    {/* Start Column From Bootstrap */}
                    <div className="col-md-4">
                        {/* Start Authentication Link List */}
                        <ul className="authentication-link-list d-flex flex-wrap justify-content-end">
                            <li className="p-2">
                                <Link href="/login">
                                    <MdOutlineLogin className="login-icon" />
                                    <span className="me-2">دخول</span>
                                </Link>
                            </li>
                            <li className="p-2">
                                <Link href="/sign-up">
                                    <FiUserPlus className="signup-icon" />
                                    <span className="me-2">انضم لنا</span>
                                </Link>
                            </li>
                        </ul>
                        {/* End Authentication Link List */}
                    </div>
                    {/* End Column From Bootstrap */}
                </div>
                {/* End Grid System From Bootstrap */}
            </div>
            {/* End Container From Bootstrap */}
        </header>
    );
} 