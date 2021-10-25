import { TodoAction, TodoActionTypes, TodoState } from './types';

const initialState: TodoState = {
  all: [
    { id: '1e', text: 'example', checked: false, status: 'all' },
    { id: '2e', text: 'example task', checked: false, status: 'all' },
    { id: '3e', text: 'some example task', checked: false, status: 'all' }
  ],
  loading: false,
};

export const TodoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.GET_ALL:
      return {
        ...state,
        all: [localStorage.getItem('tasks')]
      };
    case TodoActionTypes.ADD:
      return {
        ...state,
        all: [...state.all,
          {
            id: action.payload.id,
            text: action.payload.text,
            checked: false,
            status: 'all'
          }
        ],
      };
    case TodoActionTypes.EDIT:
      console.log('action:', action.payload);
      return {
        ...state,
        all: [...state.all.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              text: action.payload.text
            };
          }
          return item;
        })]
      };
    case TodoActionTypes.CHANGE_CHECK:
      return {
        ...state,
        all: [...state.all.map((item, index) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              checked: !item.checked
            };
          }
          return item;
        })]
      };
    case TodoActionTypes.DELETE:
      return {
        ...state,
        all: [...state.all.filter(item => item.id !== action.payload)]
      };
    case TodoActionTypes.CHANGE_STATUS:
      return {
        ...state,
        all: [...state.all.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              status: action.payload.status
            };
          }
          return item;
        })
        ]
      };
      case TodoActionTypes.DELETE_SELECTED:
      return {
        ...state,
        all: [...state.all.filter((task) => !task.checked)]
      }
    default:
      return state;
  }
};
