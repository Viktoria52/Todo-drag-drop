import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDrag } from 'react-dnd';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Checkbox } from 'antd';
import './Task.css';
import { TodoActionTypes } from '../../store/types';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';

interface TaskPropType {
  id: string;
  text: string;
  status?: string;
}

export const Task = ({ id, text, status }: TaskPropType) => {
  const { all } = useAppSelector((state) => state.TodoReducer);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  let newText: string;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deleteTask = (id: string) => {
    dispatch({
      type: TodoActionTypes.DELETE,
      payload: id,
    });
  };

  const changeEdit = (event: any) => {
    newText = event.target.value;
  };

  const saveEdit = (id: string) => {
    dispatch({
      type: TodoActionTypes.EDIT,
      payload: {
        id: id,
        text: newText,
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
    <div className="task" ref={drag}>
      <Checkbox onChange={() => changeCheckbox(id)} />
      <p className="text">{text}</p>
      {editMode && (
        <>
          <TextArea
            rows={4}
            defaultValue={text}
            onChange={(e) => changeEdit(e)}
          />
          <CheckOutlined
            onClick={() => {
              saveEdit(id);
              setEditMode(false);
            }}
          />
        </>
      )}
      <EditOutlined onClick={() => setEditMode(true)} />
      <DeleteOutlined onClick={() => deleteTask(id)} />
    </div>
  );
};
