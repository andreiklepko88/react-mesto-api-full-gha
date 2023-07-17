import logoWhite from "../images/logo-white.svg";
import { Link, useLocation, Routes, Route } from 'react-router-dom';

export default function Header({ isLoggedIn, userData, onSignOut }) {

    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logoWhite} alt="логотип" />
            {isLoggedIn ?

                <div className="header__container">
                    {location.pathname === '/main' && <p className="header__email">{userData}</p>}
                    <button className="header__sign-out" onClick={onSignOut} >Выйти</button>
                </div>
                :
                <div className="header__container">

                    <Routes>
                        <Route
                            path='/login'
                            element={
                                <li><Link className="header__link" to='/register'>Регистрация</Link></li>
                            }
                        />
                        <Route
                            path='/register'
                            element={
                                <li><Link className="header__link" to='/login'>Войти</Link></li>
                            }
                        />
                    </Routes>

                </div>
            }
        </header>
    )
}