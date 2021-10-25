import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Task } from '../TaskCard/Task';
import { TodoActionTypes } from '../../store/types';
import './Container.css';

export const ContainerTask = () => {
  const [board, setBoard] = useState([]);
  const { all } = useAppSelector((state) => state.TodoReducer);
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    // @ts-ignore
    drop: (item) => addTaskToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addTaskToBoard = (id: any) => {
    const taskList = all.filter((task) => id === task.id);
    dispatch({
      type: TodoActionTypes.CHANGE_STATUS,
      payload: {
        id: taskList[0].id,
        status: 'important'
      }
    });
    // @ts-ignore
    setBoard((board) => [...board, taskList[0]]);
    console.log('board:', board);
  };
  useEffect(() => {
    console.log('all:', all);
  }, [all]);
  return (
    <>
      <div ref={drop} className='Tasks'>
        <span className='title'>All task: </span>
        {all.map((task) => {
          return (
            task.status === 'all' && (
              <Task key={task.id} id={task.id} text={task.text} />
            )
          );
        })}
      </div>

      <div className='Board' ref={drop}>
        <span className='title'> Important task:</span>
        {board.map((task: any) => {
          return (<Task
              status="important"
              key={task.id}
              id={task.id}
              text={task.text}
            />
          );
        })}
      </div>
    </>
  );
};
