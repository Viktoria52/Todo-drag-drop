import { Checkbox, Input } from 'antd';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './style/card.module.css';
import { changeCheck, changePositionItems, deleteItemOfTask, editTask, getAll } from '../../store/thunks';

interface TaskPropType {
  id: string;
  text: string;
  checked?: boolean;
  movableItem?: number;
  currentRow?: number;
  active: boolean;
  direction?: number
}

export const TaskCard = ({ text, id, checked, movableItem, currentRow, active, direction }: TaskPropType) => {
  const { all } = useAppSelector((state) => state.TodoReducer);
  let newText: string = '';
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const deleteTask = (id: string) => {
    dispatch(deleteItemOfTask(id))
    dispatch(getAll())
  };
  const changeEdit = (event: any) => {
    newText = event.target.value;
  };
  const saveEdit = (id: string, defaultValue?: string) => {
    const editedText:any = newText || defaultValue
    dispatch(editTask(id, editedText))
  };
  const changeCheckbox = (id: string) => {
    dispatch(changeCheck(id));
  };

  const onKeyDownInput = (event: any, id: string, text: string) => {
    if (event.key === 'Enter') {
      saveEdit(id, text);
      setEditMode(false);
    }
  };

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(changePositionItems(movableItem, currentRow, active))
  //
  // }, [movableItem, currentRow, active]);

  return (
    <>
      {!editMode && (
        <Checkbox checked={checked} onChange={() => changeCheckbox(id)} />
      )}
      {!editMode && (
        <span style={{ textTransform: 'initial' }} className="text">
          {' '}
          {text}{' '}
        </span>
      )}
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
      <div className="container-icons">
        {!editMode && (
          <EditOutlined
            onClick={() => {
              setEditMode(true);
              newText = text;
            }}
          />
        )}
        <DeleteOutlined onClick={() => deleteTask(id)} />
      </div>
    </>
  );
};
