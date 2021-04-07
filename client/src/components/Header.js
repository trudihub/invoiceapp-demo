import { HeaderStyle } from "./StyledComponents"
import Logo from "./assets/logo.svg"
import MoonIcon from "./assets/icon-moon.svg"
import SunIcon from "./assets/icon-sun.svg"
import { Link } from "react-router-dom"
import Avatar from "./assets/image-avatar.jpg"
import { useState } from "react"

const Header = () => {
    const[darkMode, setDarkMode] = useState(document.body.classList.contains("darkMode")? true: false)

    const handleLightMode = () => {
        document.body.classList.remove("darkMode");
        setDarkMode(false)
    }
    const handleDarkMode = () => {
        document.body.classList.add("darkMode");
        setDarkMode(true)
    }


    return (
        <HeaderStyle>
            <Link to="/">
            <div className="logoWrapper">
                <img src={Logo} alt="logo"/>
                <div className="logoInner"></div>
            </div>
            </Link>
            {darkMode ?
            <img onClick={handleLightMode} className="darkModeToggle" src={SunIcon} alt="Light mode toggle icon"/>:
            <img onClick={handleDarkMode} className="darkModeToggle" src={MoonIcon} alt="Dark mode toggle icon"/>
             }
            <div className="line"></div>
            <img className="avatarImg" src={Avatar} alt="Avatar"/>
        </HeaderStyle>
    )
}

export default Header
