import "../../styles/colombiApp/components/BurgerButton.scss"
import { AiOutlineMenu } from "react-icons/ai";

export const BurgerButton = ({handleClick}: {handleClick: any}) => {
    return (
        <div onClick={handleClick} className="burger_icon">
                <AiOutlineMenu />

        </div>
    )
}
