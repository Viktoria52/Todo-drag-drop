import { Checkbox, Divider } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useDrag, useDragLayer } from 'react-dnd';

export const Active = () => {

  const CheckboxGroup = Checkbox.Group;

  const defaultCheckedList = [''];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  // const [checkId, setCheckId] = useState([])
  const { all } = useAppSelector(state => state.TodoReducer);
  const dispatch = useAppDispatch();

  const plainOptions: any = all.map((item) => item.id);

  const onCheckOne = (list: any) => {
    // if(list.length) {
    //   setCheckId(list[0])
    // }
    // dispatch({
    //   type: TodoActionTypes.CHANGE_CHECK,
    //   payload: { id: list[0] }
    // })
    defaultCheckedList.push(list);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAll = (e: any) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: 'BOX',
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));
  const collectedProps = useDragLayer(
    monitor => { //
    }
  )
  return (
    // collected.isDragging ?
    //   (
    //     <div ref={dragPreview} />
    //   ) :

    <div>
      {/*{drag(<div style={handleStyle} />)}*/}
      <p>Active tasks:</p>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAll} checked={checkAll}>
        Check all
      </Checkbox>
      <Divider />
      {drag(
        <div />
      )}
      {
        all.map((item) =>
          <div key={item.id} ref={dragPreview}>
            <div ref={drag}>
              <Checkbox
                value={checkedList}
                onChange={onCheckOne}
              />
              {item.text}
            </div>
          </div>
        )
      }
      {/*<div ref={dragPreview}>*/}
      {/*  <div role='Handle' ref={drag}>*/}
      {/*    <CheckboxGroup*/}
      {/*      options={all.map((item) => ({*/}
      {/*          value: item.id,*/}
      {/*          label: item.text*/}
      {/*        })*/}
      {/*      )}*/}
      {/*      value={checkedList}*/}
      {/*      onChange={onCheckOne}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};