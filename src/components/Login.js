import React from 'react'

function Login (props) {
 return(
     <div className='auth'>
         <h1 className='auth__title'>Войти</h1>
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
             <button
                 className='auth__button-submit'>Войти</button>
         </form>
     </div>
 )

}
export default Login