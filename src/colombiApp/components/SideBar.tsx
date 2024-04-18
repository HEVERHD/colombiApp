import { useState } from "react";
import "../../styles/colombiApp/components/SideBar.scss"
import {  SideBarCard, SideBarMenuItem } from "../../types/types"
import { classNames } from '../../utils/classes';
import { VscMenu } from "react-icons/vsc";
import { SidebarMenuCardView } from "./SidebarMenuCardView";
import { SidebarMenuItemView } from "./SidebarMenuItemView";
import { BiPowerOff } from "react-icons/bi"
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";



interface SideBarMenuProps {
 item: SideBarMenuItem[];
 card: SideBarCard;
}

export const SideBar = ({item, card}: SideBarMenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const dispatch = useDispatch()
    
    const onLogout = () => {
        console.log("Logout ======>")
        dispatch(startLogout())
    }

    const handleCLick = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className={classNames("sidebar_menu", isOpen ? "expanded"  : "closed")}>
        

                <div className="menu_button">
                    <button className="hamburger_icon" onClick={handleCLick}>
                        <VscMenu />
                    </button>
                </div>
        <SidebarMenuCardView card={card} isOpen= {isOpen}/>
        {
            item.map((item) => {
                return <SidebarMenuItemView key={item.id} item={item} isOpen={isOpen}/>
            })

        }
        <div className="logout">
            <button className="logout_icon" onClick={onLogout}>
            <BiPowerOff size={44}/> 
            </button>
          
        </div>

        
        </div>
    )
}
