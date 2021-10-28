import { Dispatch } from 'redux';
import { TodoAction, TodoActionTypes } from './types';
import { getArrayItemOfTask, setItemsLocalStorage } from '../utils';

export const getAll = () => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      // @ts-ignore
      const answer = getArrayItemOfTask();
      if (answer.length > 0) {
        dispatch({
          type: TodoActionTypes.GET_ALL,
          payload: answer,
        });
      }
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};

export const setAll = (id: string, text: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({
        type: TodoActionTypes.ADD,
        payload: {
          id: id,
          text: text,
        },
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};

export const deleteItemOfTask = (id: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      // @ts-ignore
      const tasks: any[] = getArrayItemOfTask();
      const newArray = tasks.filter((item) => item.id !== id);
      setItemsLocalStorage(newArray);
      dispatch({
        type: TodoActionTypes.DELETE,
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};

export const changeCheck = (id: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const tasks: any[] = getArrayItemOfTask();
      const newArray = [
        ...tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              checked: !item.checked,
            };
          }
          return item;
        }),
      ];
      setItemsLocalStorage(newArray);
      dispatch({
        type: TodoActionTypes.CHANGE_CHECK,
        payload: {
          id: id,
        },
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};

export const deleteSelectedTask = () => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      // @ts-ignore
      const tasks: any[] = getArrayItemOfTask();
      const notCheckedArray = tasks.filter((task) => !task.checked);
      setItemsLocalStorage(notCheckedArray);
      dispatch({
        type: TodoActionTypes.DELETE_SELECTED,
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};

export const editTask = (id: string, text: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      // @ts-ignore
      const tasks: any[] = getArrayItemOfTask();
      const editedTasks = [
        ...tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              text: text,
            };
          }
          return item;
        }),
      ];
      setItemsLocalStorage(editedTasks);
      dispatch({
        type: TodoActionTypes.EDIT,
        payload: {
          id: id,
          text: text,
        },
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};

export const changePositionItems = (
  movableItem: number,
  currentRow: number,
  active: boolean,
  direction: number
) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      if (!active) {
        const tasks: any[] = getArrayItemOfTask();
        if (direction >= 0) { // направление вниз
          tasks.splice(currentRow + 1, 0, tasks[movableItem]);
          tasks.splice(movableItem, 1);
        } else { //направление вверх
          tasks.splice(currentRow, 0, tasks[movableItem]);
          tasks.splice(movableItem + 1, 1);
        }
        setItemsLocalStorage(tasks);
      }
      dispatch({
        type: TodoActionTypes.CHANGE_POSITION_ITEMS,
      });
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        message: error,
      });
    }
  };
};
