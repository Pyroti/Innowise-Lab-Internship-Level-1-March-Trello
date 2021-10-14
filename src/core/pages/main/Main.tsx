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

  console.log(board);
  console.log(user);
  if (board !== null) {
    console.log(Object.keys(board));
  }
  console.log(Object.keys(user.boards));
  // console.log(currentUser);

  const filter = () =>
    Object.keys(user.boards).reduce(
      (a: { [id: string]: BoardState }, key) => ((a[key] = board[key]), a),
      {}
    );

  if (board !== null) {
    console.log(filter());
  }

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
    Promise.all([
      dispatch(getUserData(currentUser)),
      dispatch(getBoardsData(Object.keys(user.boards), board))
    ]);
  }, []);

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
        {board !== null ? (
          Object.values(filter()).map((boardd) => {
            return <div key={boardd.boardId}>{boardd.title}</div>;
          })
        ) : (
          <div></div>
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
