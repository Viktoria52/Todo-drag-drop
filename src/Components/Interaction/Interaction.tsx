import { Button, Input, message } from 'antd';
import 'antd/dist/antd.css';
import './Interaction.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useState } from 'react';
import { deleteSelectedTask, setAll } from '../../store/thunks';
import { generateUniqueID as uid } from 'web-vitals/dist/modules/lib/generateUniqueID';
import { setItemsLocalStorage } from '../../utils';

export const Interaction = () => {
  const [defaultInputValue, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { all } = useAppSelector((state) => state.TodoReducer);

  const checkedTasks = all.filter((task) => task.checked);

  const addTask = () => {
    const id = uid()
    if (defaultInputValue.length) {
      const data = [{
        id: id,
        text: defaultInputValue,
        checked: false
      }]
      dispatch(setAll(id, defaultInputValue))
      setValue('');
      //@ts-ignore
      setItemsLocalStorage(all.concat(data))
      message.success('task successfully created', 2);
    } else if (!defaultInputValue.length) {
      message.error('task cannot be empty', 2);
    } else {
      message.error('something went wrong', 2);
    }
  };

  const onChangeInput = (event: any) => {
    setValue(event.target.value);
  };

  const deleteSelected = () => {
    dispatch(deleteSelectedTask());
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
        className='input'
        placeholder='Text for task'
        value={defaultInputValue}
        onKeyDown={(e) => onKeyDownInput(e)}
        maxLength={35}
      />
      <Button
        onClick={addTask}
        className='btn' type='default'>
        Add
      </Button>
      {checkedTasks.length ? (
        <Button onClick={deleteSelected} type='primary'>
          Delete checked
        </Button>
      ) : null}
    </div>
  );
};
