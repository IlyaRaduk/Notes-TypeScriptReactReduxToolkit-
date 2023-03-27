import style from './header.module.scss'
import { FC } from "react";

const Header: FC = () => {
    return (
        <header className={style.header}>
          <h1 className={style.header__title}>Notes</h1>  
        </header>
    )
}
export default Header