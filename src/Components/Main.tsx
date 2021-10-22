import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './Main.css';
import { Active } from './Active/Active';
import { Finished } from './Finished/Finished';

const Main = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container-components'>
        <Active />
        <Finished />
      </div>
    </DndProvider>
  );
};

export default Main;