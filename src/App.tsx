import React, { useEffect } from 'react';
import './App.css';
import Main from './Components/Main';
import { Interaction } from './Components/Interaction/Interaction';
import { useAppSelector } from './store/store';

function App() {
  const { all } = useAppSelector((state) => state.TodoReducer);
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(all));
  });
  return (
    <div className="App">
      <Interaction />
      <Main />
    </div>
  );
}

export default App;
