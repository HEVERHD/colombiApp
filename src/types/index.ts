import { IconType } from "react-icons";

export interface SideBarMenuItem {
    id: string;
    icon: IconType;
    label: string;
    url?: string;
    onClick?: () => void | undefined;
}

export interface SideBarCard {
    id: string;
    displayName: string;
    photoUrl: string;
    title: string;
    url: string;
    email: string;
}

export interface RootState {
    sidebarShow: any;
    sidebarUnfoldable: any;
    changeState: any;
    auth: {
        status: string;
        errorMessage: string;
    };
}