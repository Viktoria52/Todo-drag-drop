import { Dispatch } from 'redux'
import { TodoAction, TodoActionTypes } from './types'
import { getArrayItemOfTask, getFilteredArray, setItemsLocalStorage } from '../utils/utils';

export const getAll = () => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const answer = getArrayItemOfTask()
      const filteredAnswer = getFilteredArray(answer)
      await setItemsLocalStorage(filteredAnswer)
      if (filteredAnswer.length > 0) {
        dispatch({
          type: TodoActionTypes.GET_ALL,
          payload: filteredAnswer,
        })
      }
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}

export const setAll = (id: string, text: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({
        type: TodoActionTypes.ADD,
        payload: {
          id: id,
          text: text,
        },
      })
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}

export const deleteItemOfTask = (id: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const tasks: any[] = await getArrayItemOfTask()
      const newArray =  tasks.filter((item) => item.id !== id)
     await setItemsLocalStorage(newArray)
      dispatch({
        type: TodoActionTypes.DELETE,
        payload: id,
      })
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}

export const changeCheck = (id: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const tasks: any[] = getArrayItemOfTask()
      const newArray = [
        ...tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              checked: !item.checked,
            }
          }
          return item
        }),
      ]
     await setItemsLocalStorage(newArray)
      dispatch({
        type: TodoActionTypes.CHANGE_CHECK,
        payload: {
          id: id,
        },
      })
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}

export const deleteSelectedTask = () => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const tasks: any[] = getArrayItemOfTask()
      const notCheckedArray = tasks.filter((task) => !task.checked)
      await setItemsLocalStorage(notCheckedArray)
      dispatch({
        type: TodoActionTypes.DELETE_SELECTED,
      })
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}

export const editTask = (id: string, text: string) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      const tasks: any[] = await getArrayItemOfTask()
      const editedTasks = [
        ...tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              text: text,
            }
          }
          return item
        }),
      ]
      await setItemsLocalStorage(editedTasks)
      dispatch({
        type: TodoActionTypes.EDIT,
        payload: {
          id: id,
          text: text,
        },
      })
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}

export const changePositionItems = (
  movableItem: number,
  currentRow: number,
  active: boolean,
  direction: number
) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      if (!active) {
        const tasks: any[] = await getArrayItemOfTask()
        if (direction >= 0) {
          // направление вниз
          tasks.splice(currentRow + 1, 0, tasks[movableItem])
          tasks.splice(movableItem, 1)
        } else {
          //направление вверх
          tasks.splice(currentRow, 0, tasks[movableItem])
          tasks.splice(movableItem + 1, 1)
        }
        await setItemsLocalStorage(tasks)
      }
      dispatch({
        type: TodoActionTypes.CHANGE_POSITION_ITEMS,
      })
    } catch (error) {
      dispatch({
        type: TodoActionTypes.SOME_ERROR,
        payload: error,
      })
    }
  }
}
