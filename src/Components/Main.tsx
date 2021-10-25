import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Main.module.css';
import ContainerDraggableList from './NewDnd/Container';

const Main = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-components">
        <ContainerDraggableList />
      </div>
    </DndProvider>
  );
};

export default Main;
