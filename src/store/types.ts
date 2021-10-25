export interface TodoState {
  all: any[];
  loading: boolean;
}

export enum TodoActionTypes {
  GET_ALL = 'GET_ALL',
  ADD = 'ADD',
  EDIT = 'EDIT',
  CHANGE_CHECK = 'CHANGE_CHECK',
  DELETE = 'DELETE',
  CHANGE_STATUS = 'CHANGE_STATUS',
  DELETE_SELECTED = 'DELETE_SELECTED',
}

export interface GetAllTodo {
  type: TodoActionTypes.GET_ALL;
}

export interface AddTodo {
  type: TodoActionTypes.ADD;
  payload: {
    id: string,
    text: string
  }
}

export interface EditTodo {
  type: TodoActionTypes.EDIT,
  payload: {
    id: string | number,
    text: string
  }
}

export interface DeleteTodo {
  type: TodoActionTypes.DELETE,
  payload: number
}

export interface ChangeCheck {
  type: TodoActionTypes.CHANGE_CHECK,
  payload: {
    id: string
  }
}
export interface ChangeStatus {
  type: TodoActionTypes.CHANGE_STATUS,
  payload: {
    id: string,
    status: string
  }
}
export interface DeleteSelected {
  type: TodoActionTypes.DELETE_SELECTED,
}

export type TodoAction =
  GetAllTodo |
  AddTodo |
  EditTodo |
  DeleteTodo |
  ChangeCheck |
  ChangeStatus |
  DeleteSelected