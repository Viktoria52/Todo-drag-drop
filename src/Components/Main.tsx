import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Main.css';
import { ContainerTask } from './ContainerTask/ContainerTask';

const Main = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container-components'>
        <ContainerTask />
      </div>
    </DndProvider>
  );
};

export default Main;