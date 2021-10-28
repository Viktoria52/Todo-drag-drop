import React, { useEffect } from 'react';
import './App.css';
import Main from './Components/Main';
import { Interaction } from './Components/Interaction/Interaction';
import { useAppDispatch, useAppSelector } from './store/store';
import { getAll } from './store/thunks';
import { message } from 'antd';

function App() {
  const { error } = useAppSelector((state) => state.TodoReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll())
    if(error) {
      message.error({error});
    }
  },[]);

  return (
    <div className='App'>
      <Interaction />
      <Main />
    </div>
  );
}

export default App;
