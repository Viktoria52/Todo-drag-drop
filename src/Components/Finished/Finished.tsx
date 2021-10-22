import { useDrop } from 'react-dnd';

export const Finished = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'BOX',
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      role="Dustbin"
      style={{ backgroundColor: isOver ? '#a4d9f9' : '#F3D1D1' }}
    >
      {canDrop ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}