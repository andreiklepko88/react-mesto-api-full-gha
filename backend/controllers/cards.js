/* eslint-disable arrow-body-style */
const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  OK_CODE, CREATED_CODE,
} = require('../utils/constants');

const getCards = (req, res, next) => {
  return Card.find({})
    .then((cards) => {
      if (!cards) {
        next(new NotFoundError('Not found'));
      }
      res.status(OK_CODE).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const newCardData = req.body;
  newCardData.owner = req.user.id;
  return Card.create(newCardData).then(
    (newCard) => {
      res.status(CREATED_CODE).send(newCard);
    },
  ).catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join('. ')}`));
    }
    return next(err);
  });
};

const deleteCard = (req, res, next) => {
  return Card.findById(req.params.cardId).then(
    (card) => {
      if (!card) {
        next(new NotFoundError('Card not found'));
      }
      if (req.user.id !== card.owner.toString()) {
        next(new ForbiddenError('Can not delete another users card'));
      } else {
        return Card.deleteOne(card)
          .then(() => {
            return res.status(OK_CODE).send({ message: 'Card deleted' });
          });
      }
    },
  ).catch(next);
};

const likeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Card not found'));
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Incorrect Id number'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  return Card.findByIdAndUpdate(
    { _id: req.params.cardId },
    { $pull: { likes: req.user.id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      next(new NotFoundError('Card not found'));
    } else {
      res.send(card);
    }
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Incorrect Id number'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
};
