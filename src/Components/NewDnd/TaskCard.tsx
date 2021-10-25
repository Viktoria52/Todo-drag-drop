import { Checkbox, Input } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { TodoActionTypes } from '../../store/types';
import './style/card.module.css';

interface TaskPropType {
  id: string;
  text: string;
}

export const TaskCard = ({ text, id }: TaskPropType) => {
  let newText: string;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const deleteTask = (id: string) => {
    dispatch({
      type: TodoActionTypes.DELETE,
      payload: id,
    });
  };
  const changeEdit = (event: any) => {
    newText = event.target.value;
  };
  const saveEdit = (id: string, defaultValue?: string) => {
    dispatch({
      type: TodoActionTypes.EDIT,
      payload: {
        id: id,
        text: newText || defaultValue,
      },
    });
  };
  const changeCheckbox = (id: string) => {
    dispatch({
      type: TodoActionTypes.CHANGE_CHECK,
      payload: {
        id: id,
      },
    });
  };

  return (
    <>
      {!editMode && <Checkbox onChange={() => changeCheckbox(id)} />}
      {!editMode && <span className="text"> {text} </span>}
      {editMode && (
        <>
          <Input
            className="area-style"
            size="small"
            style={{ width: '80%' }}
            defaultValue={text}
            onChange={(e) => changeEdit(e)}
          />
          <CheckOutlined
            onClick={() => {
              saveEdit(id, text);
              setEditMode(false);
            }}
          />
        </>
      )}

      {!editMode && (
        <EditOutlined
          onClick={() => {
            setEditMode(true);
            newText = text;
          }}
        />
      )}

      <DeleteOutlined onClick={() => deleteTask(id)} />
    </>
  );
};
