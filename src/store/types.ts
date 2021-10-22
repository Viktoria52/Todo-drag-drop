export interface TodoState {
  all: any[];
  loading: boolean;
  deletedTodos: any[];
}

export enum TodoActionTypes {
  GET_ALL = 'GET_ALL',
  ADD = 'ADD',
  EDIT = 'EDIT',
  CHANGE_CHECK = 'CHANGE_CHECK',
  DELETE = 'DELETE',
}

export interface GetAllTodo {
  type: TodoActionTypes.GET_ALL;
}

export interface AddTodo {
  type: TodoActionTypes.ADD;
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
    id: string | number
  }
}

export type TodoAction =
  GetAllTodo |
  AddTodo |
  EditTodo |
  DeleteTodo |
  ChangeCheck