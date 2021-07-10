import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import PopupWithConfirm from './PopupWithConfirm'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cardIdToDelete, setCardIdToDelete] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        Promise.all([
            api.getUser(),
            api.getCards()
        ])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData)
                setCards(cardsData)
            })
            .catch((err) => console.log(err))
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        setIsAddCardPopupOpen(true)
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleUpdateUser(data){
        setIsLoading(true)
        api.updateUserInfo(data)
            .then(userData => {
                setCurrentUser(userData)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }
    function handleAddPlaceSubmit(data){
        setIsLoading(true)
        api.saveNewCard(data)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }
    function handleUpdateAvatar(data){
        setIsLoading(true)
        api.newAvatar(data)
            .then(avatar => {
                setCurrentUser(avatar)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }
    function handleCardDelete(card){
        setIsConfirmPopupOpen(true)
        setCardIdToDelete(card);
    }

    function handleCardDeleteConfirm(card) {
        setIsLoading(true)
        api.deleteCard(card._id)
            .then(() => {
                const newCards = cards.filter(item => item !== card)
                setCards(newCards)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false))
    }
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err))
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsConfirmPopupOpen(false)
        setSelectedCard(null);
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
          />
          <Footer />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
          />
          <AddPlacePopup
              isOpen={isAddCardPopupOpen}
              onClose={closeAllPopups}
              onAddCard={handleAddPlaceSubmit}
              isLoading={isLoading}
          />
          <PopupWithConfirm
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
              onHandleCardDeleteConfirm={handleCardDeleteConfirm}
              cardId={cardIdToDelete}
              isLoading={isLoading}
          />
          <ImagePopup
              card={selectedCard !== null && selectedCard}
              onClose={closeAllPopups}
          />
      </CurrentUserContext.Provider>
  );
}

export default App;
