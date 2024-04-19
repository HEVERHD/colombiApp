import { SideBarMenuItem } from "../../types/types";
import { classNames } from "../../utils/classes";
import "../../styles/colombiApp/components/SidebarMenuItemView.scss";
import { Link } from "react-router-dom";

interface SidebarMenuItemViewProps{
    item: SideBarMenuItem;
    isOpen: boolean;
}

export const SidebarMenuItemView = ({item, isOpen}: SidebarMenuItemViewProps) => {
    return (
        <div className="sidebar_menu_item">
            <Link to={item.url || ""}>
                <div className={classNames("item_content", isOpen? "": "closed")}>
                    <div className="icon">
                        <item.icon size={32}/>
                    </div>
                    <div className="label">{item.label}</div>
                </div>
            </Link>
            {
                !isOpen ? <div className="tooltip">{item.label}</div> : null
            }
            <div>
            </div>
        </div>
    )
}
