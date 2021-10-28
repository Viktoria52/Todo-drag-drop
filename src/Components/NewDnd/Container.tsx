import { useAppSelector } from '../../store/store';
import React from 'react';
import { DraggableList } from './DraggableList';

export default function ContainerDraggableList() {
  const { all } = useAppSelector((state) => state.TodoReducer);

  let arrayItems = all.map((item) => {
    return Object.entries(item);
  });

  return (
    <div className="flex fill center">
      { all.length > 0 && <DraggableList items={arrayItems} /> }
    </div>
  );
}
