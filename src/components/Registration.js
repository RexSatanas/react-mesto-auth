import React from 'react'
import { Link } from 'react-router-dom'
function Registration(props){
    return(
        <div className='auth'>
            <h1 className='auth__title'>Регистрация</h1>
            <form className='auth__form'>
                <input
                    className='auth__input'
                    name="email"
                    type="email"
                    placeholder="Email"
                    minLength="2"
                    required/>
                <input
                    className='auth__input'
                    name="password"
                    type="password"
                    placeholder="Password"
                    minLength="7"
                    required/>
                <button className='auth__button-submit'>Зарегистрироваться</button>
                <Link className='auth__question' to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}
export default Registration