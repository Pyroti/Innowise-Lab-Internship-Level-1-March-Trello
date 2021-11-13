import React, { useCallback, useEffect, useState } from 'react';
import { CardState } from '../../../../core/redux/types/cards/cardTypes';
import CardsContainer from '../styled/CardsContainer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import OptionContainer from './styled/OptionContainer';
import Input from '@mui/material/Input';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteCardModal from '../../../../core/components/modals/deleteCardModal/deleteCardModal';
import deleteCardThunk from '../../../../core/redux/thunk/cards/deleteCard';
import editCardThunk from '../../../../core/redux/thunk/cards/editCard';

interface CardProps {
  card: CardState;
  boardId: string;
  getCardsId: () => string[];
  updateCardsOrder: (boardsId: string) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const { card, boardId, getCardsId, updateCardsOrder } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cardState, setCardState] = useState({
    cardTitle: card.title
  });
  const { cardTitle } = cardState;

  const dispatch = useDispatch();

  const updateEditCard = () => {
    setIsEditing((prev) => !prev);
  };

  const editCard = useCallback(() => {
    const data = { card, cardTitle, getCardsId };
    dispatch(editCardThunk(data));
    updateEditCard();
  }, [card, cardTitle, getCardsId, dispatch]);

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
    setCardState((prevState) => ({ ...prevState, [name]: value }));
  };

  const deleteCard = () => {
    const data = {
      updateCardsOrder,
      card,
      boardId,
      getCardsId
    };
    dispatch(deleteCardThunk(data));
  };

  const openDeleteCardModal = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  if (isEditing) {
    return (
      <CardsContainer>
        <Input
          placeholder={card.title}
          type="text"
          name="cardTitle"
          value={cardTitle}
          onChange={handleChange}
        />
        <OptionContainer>
          <CheckIcon onClick={editCard} />
          <CloseIcon onClick={updateEditCard} />
        </OptionContainer>
      </CardsContainer>
    );
  }

  return (
    <>
      <CardsContainer>
        {card.order}
        {':'}
        {card.title}
        <OptionContainer>
          <CreateIcon onClick={updateEditCard} />
          <DeleteRoundedIcon onClick={openDeleteCardModal} />
        </OptionContainer>
      </CardsContainer>
      <DeleteCardModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        deleteCard={deleteCard}
      />
    </>
  );
};

export default Card;
