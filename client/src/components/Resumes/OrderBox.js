import React, { useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Column from './OrderComponents/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

function OrderBox({ components, setComponents }) {
  const [showOrderBox, setShowOrderBox] = useState(0);
  const handleShowOrderBox = () => {
    if (showOrderBox === 0) setShowOrderBox(1);
    if (showOrderBox === 1) setShowOrderBox(0);
  };

  //   console.log(components);
  const getComponentPos = (id) =>
    components.findIndex((component) => component.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setComponents((component) => {
      const originalPos = getComponentPos(active.id);
      const newPos = getComponentPos(over.id);
      return arrayMove(components, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div>
      <button className="btn-download btn-order" onClick={handleShowOrderBox}>
        Change Order
      </button>
      {showOrderBox === 1 && (
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <Column components={components} />
        </DndContext>
      )}
    </div>
  );
}

export default OrderBox;
