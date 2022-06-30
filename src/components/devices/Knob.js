import React, { useState } from 'react';
import {
  translateGlobalCoordinatesToLocal,
  cartesianToPolar,
} from '../../utils/conversions';

export default ({
  children,
  x,
  y,
  scale,
  offset,
  onChange,
}) => {
  const [rotation, setRotation] = useState(0);
  const [dragHandlePosition, setDragHandlePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const center = { x: 100, y: 100 };

  const startDrag = ({ clientX, clientY }) => {
    const { x: panelX, y: panelY } = translateGlobalCoordinatesToLocal(clientX, clientY, offset, 0);
    const { x: knobX, y: knobY } = translateGlobalCoordinatesToLocal(panelX, panelY, x, y);
    const { angle } = cartesianToPolar(knobX / scale, knobY / scale, center);
    setDragHandlePosition(angle - rotation);
    setIsDragging(true);
  }

  const drag = ({ clientX, clientY }) => {
    if (isDragging) {
      const { x: panelX, y: panelY } = translateGlobalCoordinatesToLocal(clientX, clientY, offset, 0);
      const { x: knobX, y: knobY } = translateGlobalCoordinatesToLocal(panelX, panelY, x, y);
      const { angle } = cartesianToPolar(knobX / scale, knobY / scale, center);
      setRotation(angle - dragHandlePosition);
      onChange(rotation);
    }
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  return (
    <g
      className="davies-knob"
      onMouseDown={startDrag}
      onMouseMove={drag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      transform={`scale(${scale} ${scale}) translate(${x} ${y}) rotate(${rotation} ${center.x} ${center.y})`}>
      {children}
    </g>
  )
}
