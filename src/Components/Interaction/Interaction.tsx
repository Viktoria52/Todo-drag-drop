import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './Interaction.css';
import { TodoActionTypes } from '../../store/types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { uuidv4 } from '../../utils';
import { useState } from 'react';

export const Interaction = () => {
  const [defaultInputValue, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { all } = useAppSelector((state) => state.TodoReducer);

  const checkedTasks = all.filter((task) => task.checked);

  const addTask = () => {
    if (defaultInputValue.length) {
      dispatch({
        type: TodoActionTypes.ADD,
        payload: {
          id: uuidv4(),
          text: defaultInputValue,
        },
      });
      setValue('');
    }
  };

  const onChangeInput = (event: any) => {
    setValue(event.target.value);
  };

  const deleteSelected = () => {
    dispatch({
      type: TodoActionTypes.DELETE_SELECTED,
    });
  };

  const onKeyDownInput = (event: any) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div>
      <Input
        onChange={(e) => onChangeInput(e)}
        className="input"
        placeholder="Text for task"
        value={defaultInputValue}
        onKeyDown={(e) => onKeyDownInput(e)}
        maxLength={35}
      />
      <Button onClick={addTask} className="btn" type="default">
        Add
      </Button>
      {checkedTasks.length ? (
        <Button onClick={deleteSelected} type="primary">
          Delete checked
        </Button>
      ) : null}
    </div>
  );
};
