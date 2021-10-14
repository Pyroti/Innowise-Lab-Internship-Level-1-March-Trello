import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { logoutInitiate } from '../../redux/action-creators/auth/logoutAction';
import {
  getBoardsData,
  writeBoardData
} from '../../redux/action-creators/boards/boardAction';
import {
  getUserData,
  writeUserBoardData
} from '../../redux/action-creators/users/userAction';
import authSelector from '../../redux/selectors/authSelector';
import { BoardState } from '../../redux/types/boards/boardTypes';

const Main: React.FC = () => {
  const { currentUser } = useTypedSelector(authSelector);
  const { user } = useTypedSelector((state) => state.user);
  const { board } = useTypedSelector((state) => state.board);

  const filterBoards = () => {
    return Object.keys(user?.boards ?? {})
      .map((boardId) => {
        return board?.[boardId]
      })
      // .filter((board) => board);
  }

  [undefined, undefined, undefined]


  const isLoading = useTypedSelector((state) => state.user.isLoading);


  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [boardState, setBoardState] = useState({
    title: ''
  });
  const { title } = boardState;

  const getCurrentUserData = () => {
    dispatch(getUserData(currentUser));
  };

  useEffect(() => {
    dispatch(getUserData(currentUser));
  }, [currentUser, dispatch])

  useEffect(() => {
    console.log('IN USE EFFECT', user);
    if (user) {
      dispatch(getBoardsData(Object.keys(user.boards)));
    }
  }, [dispatch, user]);

  console.log('IN COMPONENT', user);

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setBoardState((prevState) => ({ ...prevState, [name]: value }));
  };

  const addBoard = () => {
    const boardId = uuidv4();
    dispatch(writeBoardData(boardId, title, board));
    dispatch(writeUserBoardData(currentUser, boardId));
    setBoardState({ title: '' });
    getCurrentUserData();
  };

  if (isLoading) {
    return <div>загрузка</div>;
  }

  const dataToRender = Object.values(filterBoards() ?? []);
  console.log('dataToRender', dataToRender);

  return (
    <div>
      <h2>{t('marchTrello')}</h2>
      <h3>
        {t('hello')} {user?.username}
      </h3>
      <button type="button" onClick={handleAuth}>
        {t('exit')}
      </button>
      <br />

      <div>
        {board && (
          dataToRender.map((boardd) => {
            console.log('boardd', boardd);
            return boardd && <div key={boardd.boardId}>{boardd.title}</div>;
          })
        )}
      </div>
      <br />
      <input
        placeholder="Введите заголовок доски"
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <button type="button" onClick={addBoard}>
        Добавить доску
      </button>
    </div>
  );
};

export default Main;
