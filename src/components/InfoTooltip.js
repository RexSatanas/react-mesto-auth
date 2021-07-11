import success from '../images/success.svg'
import fail from '../images/fail.svg'


function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_auth ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_auth">
                <img
                    className="popup__auth-image"
                    src={props.isRegistration ? success : fail}
                    alt="Результат регистрации"
                />
                <h3 className="popup__title popup__title_auth">{props.isRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
                <button
                    className="popup__button-close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={props.onClose}
                ></button>
            </div>
        </div>
    )
}

export default InfoTooltip