import "../../styles/colombiApp/layout/ColombiAppLayout.scss"
import { SideBarCard, SideBarMenuItem } from "../../types/types"
import { Navbar } from "../components/Navbar"
import { SideBar } from "../components/SideBar"
import { FcDebt } from "react-icons/fc"
import { BsFillTicketPerforatedFill } from "react-icons/bs"
import { BsHouseDoor } from "react-icons/bs"



export const ColombiAppLayout = ({children}: {children: React.ReactNode}) => {


    const items:SideBarMenuItem[] = [
        {
            id: "1",
            icon: BsHouseDoor,
            label: "Home",
            url : "/",
        },
        {
            id: "2",
            icon: FcDebt,
            label: "Ciudades",
            url : "/cities",
        },
        {
            id: "3",
            icon: BsFillTicketPerforatedFill,
            label: "Presidentes",
            url : "/presidents",
        },
        // ... otros elementos del menú
    ]
    const cards:SideBarCard = {
        id: "01",
        displayName: "Hevert Gelis",
        photoUrl: "https://randomuser.me/api/portraits/men/95.jpg",
        email:"heverHD@gmail.com" ,
        title: "Software Developer",
        url:"/"
    
    }
    return (
        <div className="container_colombiapp_main">

                {/* Navbar */}
                <Navbar />

               {/* Sidebar */}
                    <SideBar item={items} card={cards} /> 

                 <div className="container_colombiapp_content">
                 {/* Toolbar */}
                        {children}
                 </div>
        </div>
    )
}
