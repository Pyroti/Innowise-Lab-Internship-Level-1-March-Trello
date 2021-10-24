import React, { useState } from 'react';
import { CardState } from '../../../../redux/types/cards/cardTypes';
import CardStyled from '../styled/CardsStyled';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import {
  deleteCardData,
  editCardData,
  getCardsData
} from '../../../../redux/action-creators/cards/cardAction';
import { deleteCardIdData } from '../../../../redux/action-creators/boards/boardAction';
import CreateIcon from '@mui/icons-material/Create';
import OptionWrap from './styled/OptionWrap';
import Input from '@mui/material/Input';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';

interface CardProps {
  card: CardState;
  boardId: string;
  cardsId: () => string[];
  updateCardsOrder: () => void;
}

const Card: React.FC<CardProps> = (props) => {
  const cards = useTypedSelector((state) => state.card).card;
  const { card, boardId, cardsId, updateCardsOrder } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [cardState, setCardtate] = useState({
    cardTitle: card.title
  });
  const { cardTitle } = cardState;

  const dispatch = useDispatch();

  const isEditCard = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setCardtate((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteCard = () => {
    dispatch(deleteCardData(card.cardId, cards));
    updateCardsOrder();
    dispatch(deleteCardIdData(card.cardId, boardId));
    dispatch(getCardsData(cardsId()));
  };

  const editCard = () => {
    dispatch(editCardData(card.cardId, cardTitle));
    dispatch(getCardsData(cardsId()));
    isEditCard();
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
    <CardStyled>
      {card.order}
      {':'}
      {card.title}
      <OptionWrap>
        <CreateIcon onClick={isEditCard} />
        <DeleteRoundedIcon onClick={deleteCard} />
      </OptionWrap>
    </CardStyled>
  );
};

export default Card;
