import successfulTooltip from '../images/successful-registration.svg';
import unSuccessfulTooltip from '../images/unsuccessful-registration.svg';
import { phrases } from '../constants/constants';

export default function InfoToolTip({ isOpen, onClose, isRegisterSuccessful }) {
    return (
        <div className={`popup ${ isOpen && "popup_opened"}`}>
            <div className="tooltip__container">
                <figure className="tooltip__figure">
                    <img className="tooltip__image" src={ isRegisterSuccessful ? successfulTooltip : unSuccessfulTooltip}
                    alt={ isRegisterSuccessful ? phrases.altSuccess : phrases.altUnSuccess}/>
                    <figcaption className="tooltip__caption">
                        { isRegisterSuccessful ? phrases.registerSuccess :
                         phrases.registerUnSuccess } 
                    </figcaption>
                </figure>
                <button className="popup__icon-close" type="button" aria-label="закрыть" onClick={onClose}></button>
            </div>
        </div>
    )
}