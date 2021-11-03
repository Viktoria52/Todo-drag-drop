import { TodoAction, TodoActionTypes, TodoState } from './types'
import { getFilteredArray } from '../utils/utils';

const initialState: TodoState = {
  all: [],
  loading: false,
  error: false,
}

export const TodoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.GET_ALL:
      return {
        ...state,
        all: action.payload,
      }
    case TodoActionTypes.ADD:
      return {
        ...state,
        all: [
          ...state.all,
          {
            id: action.payload.id,
            text: action.payload.text,
            checked: false,
          },
        ],
      }
    case TodoActionTypes.EDIT:
      return {
        ...state,
        all: [
          ...state.all.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                text: action.payload.text,
              }
            }
            return item
          }),
        ],
      }
    case TodoActionTypes.CHANGE_CHECK:
      return {
        ...state,
        all: [
          ...state.all.map((item) => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                checked: !item.checked,
              }
            }
            return item
          }),
        ],
      }
    case TodoActionTypes.DELETE:
      return {
        ...state,
        all: [...state.all.filter((task) => task.id !== action.payload)],
      }
    case TodoActionTypes.DELETE_SELECTED:
      return {
        ...state,
        all: [...state.all.filter((task) => !task.checked)],
      }
    case TodoActionTypes.SOME_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
