import { Checkbox, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';

export const Active = () => {
  const CheckboxGroup = Checkbox.Group;

  const defaultCheckedList = [''];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const { all } = useAppSelector(state => state.TodoReducer);

  const plainOptions: any = all;

  console.log("plainOptions:", plainOptions);
  const onChange = (list: any) => {
    console.log('list:', list);
    console.log('defaultCheckedList:', defaultCheckedList);
    defaultCheckedList.push(list)
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };


  return (
    <div>
      <p>Active tasks:</p>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={all.map((item) => item.text)}
        value={defaultCheckedList}
        onChange={onChange}
      />
    </div>
  );
};