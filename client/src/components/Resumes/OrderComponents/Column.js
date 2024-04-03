import React from 'react';
import './Column.css';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Components from './Components';

function Column({ components }) {
  return (
    <div className="order-column">
      <SortableContext
        items={components}
        strategy={verticalListSortingStrategy}
      >
        {components.map((el, i) => (
          <Components title={el.title} id={el.id} key={el.id} />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;
