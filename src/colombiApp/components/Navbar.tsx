
import { AiOutlineLogout } from "react-icons/ai";
import "../../styles/colombiApp/components/navbar.scss";


export const Navbar = () => {



    return (
        <div className="navbar_main">
         
            <div className="links">
                {/* <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a> */}
            </div>
            <AiOutlineLogout />
        </div>
    );
};
