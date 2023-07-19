import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { mestoApi } from "../utils/MestoAuth";
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoTooltip";
import Register from "./Register";
import Login from './Login'

export default function App() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isDeleteCardLoading, setIsDeleteCardLoading] = useState(false);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardForDelete, setCardForDelete] = useState({});

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccessful, setRegisterSuccessful] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn && Promise.all([api.getUserData(), api.getCards()])
      .then(([resUserData, resCards]) => {
        setCurrentUser(resUserData);
        setCards(resCards);
        checkJwtToken();
      })
      .catch((err) => console.error(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsDeleteCardLoading(true);
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDelete._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsConfirmPopupOpen(false);
        setIsDeleteCardLoading(false)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => { setCards((state) => state.map((c) => c._id === card._id ? newCard : c)) })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    setIsUserInfoLoading(true);

    api.editProfile({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsUserInfoLoading(false)
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsAddPlaceLoading(true);
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsAddPlaceLoading(false)
      })
  }

  function handleUpdateAvatar({ link }) {
    setIsAvatarLoading(true);
    api.changeAvatar({ link })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsAvatarLoading(false)
      })
  }

  function closeAllPopups() {
    setSelectedCard({});
    setImagePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleLogin(email, password) {
    mestoApi.login(email, password)
      .then(() => {
        setLoggedIn(true);
        navigate('/main');
      })
      .catch((err) => console.log(err))
  }

  function handleRegister(email, password) {
    mestoApi.register(email, password)
      .then((data) => {
        setRegisterSuccessful(true);
        setInfoTooltipOpen(true);
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
        setInfoTooltipOpen(true);
        setRegisterSuccessful(false);
      })
  }

  function signOut() {
    mestoApi.logOut()
      .then(() => {
        setLoggedIn(false);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    checkJwtToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkJwtToken() {

    mestoApi.checkToken()
      .then((data) => {
        setLoggedIn(true);
        navigate(location.pathname);
        setUserData(data.email);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-wrapper">
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            userData={userData}
            onSignOut={signOut}
          />
          <Routes>
            <Route path="/main" element={<ProtectedRoute
              element={Main}
              isLoggedIn={isLoggedIn}
              onCardClick={(link) => {
                setSelectedCard(link);
                setImagePopupOpen(true)
              }}
              onCardDelete={(card) => {
                setCardForDelete(card);
                setIsConfirmPopupOpen(true);
              }}
              onEditAvatar={() => { setEditAvatarPopupOpen(!isEditAvatarPopupOpen) }}
              onAddPlace={() => { setAddPlacePopupOpen(!isAddPlacePopupOpen) }}
              onEditProfile={() => { setEditProfilePopupOpen(!isEditProfilePopupOpen) }}
              cards={cards}
              onCardLike={handleCardLike}
            />} />
            <Route path="/" element={isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login handleLogin={handleLogin} />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/" replace /> : <Register handleRegister={handleRegister} />} />
            <Route path="*" element={isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />} />
          </Routes>
          <Footer />
        </div>

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          isLoading={isUserInfoLoading}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          isLoading={isAddPlaceLoading}
        />

        <PopupWithConfirmation
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isLoading={isDeleteCardLoading}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isAvatarLoading}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        />

        <ImagePopup
          onClose={closeAllPopups}
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
        />

        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegisterSuccessful={isRegisterSuccessful}
        />

      </div>
    </CurrentUserContext.Provider>
  )
}


