import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './Main.module.css'
import { DraggableList } from './NewDnd/DraggableList'
import React from 'react'
import { useAppSelector } from '../store/store'

const Main = ({ addTaskRef }: { addTaskRef: any }) => {
  const { all } = useAppSelector((state) => state.TodoReducer)

  let arrayItems = all.map((item) => {
    return Object.entries(item)
  })

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-components">
        {all.length > 0 && (
          <DraggableList
            addTaskRef={addTaskRef}
            items={all.length > 0 ? arrayItems : []}
          />
        )}
      </div>
    </DndProvider>
  )
}

export default Main
