export interface TodoState {
  all: any[];
  loading: boolean;
  error: unknown
}

export enum TodoActionTypes {
  GET_ALL = 'GET_ALL',
  ADD = 'ADD',
  SET_ALL = 'SET_ALL',
  EDIT = 'EDIT',
  CHANGE_CHECK = 'CHANGE_CHECK',
  DELETE = 'DELETE',
  DELETE_SELECTED = 'DELETE_SELECTED',
  SOME_ERROR = 'SOME_ERROR',
  CHANGE_POSITION_ITEMS = 'CHANGE_POSITION_ITEMS',
}

export interface GetAllTodo {
  type: TodoActionTypes.GET_ALL;
  payload: any[]
}

export interface SetAllTodo {
  type: TodoActionTypes.SET_ALL;
}

export interface AddTodo {
  type: TodoActionTypes.ADD;
  payload: {
    id: string;
    text: string;
  };
}

export interface EditTodo {
  type: TodoActionTypes.EDIT;
  payload: {
    id: string | number;
    text: string;
  };
}

export interface DeleteTodo {
  type: TodoActionTypes.DELETE;
  payload?: string;
}

export interface ChangeCheck {
  type: TodoActionTypes.CHANGE_CHECK;
  payload: {
    id: string;
  };
}

export interface DeleteSelected {
  type: TodoActionTypes.DELETE_SELECTED;
}
export interface SomeError {
  type: TodoActionTypes.SOME_ERROR;
  message: unknown
}

export interface ChangePositionItems {
  type: TodoActionTypes.CHANGE_POSITION_ITEMS;
}

export type TodoAction =
  | GetAllTodo
  | AddTodo
  | EditTodo
  | DeleteTodo
  | ChangeCheck
  | DeleteSelected
  | SetAllTodo
  | SomeError
| ChangePositionItems

