import { SideBarMenuItem } from "../../types/types";
import { classNames } from "../../utils/classes";
import "../../styles/colombiApp/components/SidebarMenuItemView.scss";

interface SidebarMenuItemViewProps{
    item: SideBarMenuItem;
    isOpen: boolean;
    
}

export const SidebarMenuItemView = ({item,isOpen}: SidebarMenuItemViewProps) => {
  return (
    <div className="sidebar_menu_item">
        <a href={item.url}>
            <div className={classNames("item_content", isOpen? "": "closed")}>
                <div className="icon">
                    <item.icon size={32}/>
                </div>
                <div className="label">{item.label}</div>
            </div>
        </a>
        {
            !isOpen ? <div className="tooltip">{item.label}</div> : null
        }
        <div>         
        </div>      
    </div>
  )
}
