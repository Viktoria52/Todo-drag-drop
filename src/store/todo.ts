import { TodoAction, TodoActionTypes, TodoState } from './types';

const initialState: TodoState = {
  all: [
    {id: '1e', text: 'example', checked: false},
    {id: '2e', text: 'example task', checked: false},
    {id: '3e', text: 'some example task', checked: false},
  ],
  loading: false,
  deletedTodos: []
};

export const TodoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.ADD:
      return {
        ...state,
        all: [...state.all, action]
      };
      case TodoActionTypes.EDIT:
      return {
        ...state,
        all: [...state.all.map((item, index) => {
          if (index === action.payload.id) {
            return {
              ...item,
              text: action.payload.text
            };
          }
          return item;
        })]
      };
    default:
      return state;
  }
};
