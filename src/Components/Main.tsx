import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Active } from './Active/Active';
import { Finished } from './Finished/Finished';
import './Main.css'

const Main = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-components">
        <Active />
        <Finished />
      </div>
    </DndProvider>
  );
};

export default Main;