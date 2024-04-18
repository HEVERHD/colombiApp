import { SideBarCard } from "../../types/types";
import { classNames } from "../../utils/classes";
import "../../styles/colombiApp/components/SidebarMenuCardView.scss"
import { useSelector } from "react-redux";

interface SidebarMenuCardViewProps {
    card: SideBarCard;
    isOpen: boolean;
    
}



export const SidebarMenuCardView = ({card,isOpen}:SidebarMenuCardViewProps) => {

const {displayName, photoURL,email} =  useSelector( state => state.auth)
  return (
    <div className="sidebar_menu_card_view">
        <div className="name"><span> Hola </span> {
            displayName?.split(" ")[0]
        }!</div>
         <img className="profile" src={photoURL} alt={displayName}  />
        <div className={classNames("profile_info", isOpen? "": "closed")}>
            <div className="title">{card.title}</div>  
            <div className="url">{email}</div>
        </div>
    </div>
  )
}
