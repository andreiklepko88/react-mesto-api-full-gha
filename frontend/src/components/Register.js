import { Link } from "react-router-dom";
import { useState } from "react";


export default function Register({ handleRegister }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = formValue;
        handleRegister(email, password);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        }) 
    }

    return (
        <div className="register__container">
            <h2 className="register__header">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input className="register__input" value={formValue.email} onChange={handleChange} id="email" type="email" name="email" placeholder="Email" minLength="2" maxLength="20" required/>
                <input className="register__input" value={formValue.password} onChange={handleChange} id="password" type="password" name="password" placeholder="Пароль" minLength="2" maxLength="20" required/>
                <button className="register__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="register__if-registered">Уже зарегистрированы? <Link className="register__to-login" to='/login'>Войти</Link></p>
        </div>
    )
}