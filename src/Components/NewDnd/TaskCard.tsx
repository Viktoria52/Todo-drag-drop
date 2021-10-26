import { Checkbox, Input } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { TodoActionTypes } from '../../store/types';
import './style/card.module.css';

interface TaskPropType {
  id: string;
  text: string;
  checked?: boolean;
}

export const TaskCard = ({ text, id, checked }: TaskPropType) => {
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

  const onKeyDownInput = (event: any, id: string, text: string) => {
    if (event.key === 'Enter') {
      saveEdit(id, text);
      setEditMode(false);
    }
  };

  return (
    <>
      {!editMode && (
        <Checkbox
          checked={checked}
          onChange={() => changeCheckbox(id)}
        />
      )}
      {!editMode && <span className="text"> {text} </span>}
      {editMode && (
        <>
          <Input
            className="area-style"
            size="small"
            style={{ width: '80%' }}
            defaultValue={text}
            onChange={(e) => changeEdit(e)}
            onKeyDown={(e) => onKeyDownInput(e, id, text)}
            maxLength={35}
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
