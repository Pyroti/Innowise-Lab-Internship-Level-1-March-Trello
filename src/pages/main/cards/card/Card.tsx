import React, { useCallback, useEffect, useState } from 'react';
import { CardState } from '../../../../core/redux/types/cards/cardTypes';
import CardStyled from '../styled/CardsStyled';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import OptionWrap from './styled/OptionWrap';
import Input from '@mui/material/Input';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteCardModal from '../../../../core/components/deleteCardModal/deleteCardModal';
import deleteCardThunk from '../../../../core/redux/thunk/card/deleteCard';
import editCardThunk from '../../../../core/redux/thunk/card/editCard';

interface CardProps {
  card: CardState;
  boardId: string;
  cardsId: () => string[];
  updateCardsOrder: (boardsId: string) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const { card, boardId, cardsId, updateCardsOrder } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cardState, setCardtate] = useState({
    cardTitle: card.title
  });
  const { cardTitle } = cardState;

  const dispatch = useDispatch();

  const isEditCard = () => {
    setIsEditing((prev) => !prev);
  };

  const editCard = useCallback(() => {
    const data = { card, cardTitle, cardsId };
    dispatch(editCardThunk(data));
    isEditCard();
  }, [card, cardTitle, cardsId, dispatch]);

  const keyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        editCard();
      }
    },
    [editCard]
  );

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    }
  }, [keyPress, isEditing]);

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setCardtate((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteCard = () => {
    const data = {
      updateCardsOrder,
      card,
      boardId,
      cardsId
    };
    dispatch(deleteCardThunk(data));
  };

  const openDeleteCardModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  if (isEditing) {
    return (
      <CardStyled>
        <Input
          placeholder={card.title}
          type="text"
          name="cardTitle"
          value={cardTitle}
          onChange={handleChange}
        />
        <OptionWrap>
          <CheckIcon onClick={editCard} />
          <CloseIcon onClick={isEditCard} />
        </OptionWrap>
      </CardStyled>
    );
  }

  return (
    <>
      <CardStyled>
        {card.order}
        {':'}
        {card.title}
        <OptionWrap>
          <CreateIcon onClick={isEditCard} />
          <DeleteRoundedIcon onClick={openDeleteCardModal} />
        </OptionWrap>
      </CardStyled>
      <DeleteCardModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        deleteCard={deleteCard}
      />
    </>
  );
};

export default Card;
