import { IconType } from "react-icons";

export interface SideBarMenuItem{
    id: string;
    icon: IconType;
    label: string;
    url?: string;
    onClick?: () => void | undefined;
}

export interface SideBarCard{
    id: string;
    displayName : string;
    photoUrl : string;
    title : string;
    url : string;
    email : string;
}

export interface RootState {
    auth: {
        status: string;
        errorMessage: string;
    };
}