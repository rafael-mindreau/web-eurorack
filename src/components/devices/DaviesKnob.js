import React, { useState } from 'react';
import {
  translateGlobalCoordinatesToLocal,
  cartesianToPolar,
} from '../../utils/conversions';
import './DaviesKnob.scss';

export default ({
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
    setDragHandlePosition(angle);
    setIsDragging(true);
  }

  const drag = ({ clientX, clientY }) => {
    if (isDragging) {
      const { x: panelX, y: panelY } = translateGlobalCoordinatesToLocal(clientX, clientY, offset, 0);
      const { x: knobX, y: knobY } = translateGlobalCoordinatesToLocal(panelX, panelY, x, y);
      const { angle } = cartesianToPolar(knobX / scale, knobY / scale, center);
      setRotation(angle - dragHandlePosition);
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
      <g>
        <circle className="st0" cx="100" cy="100" r="77"/>
      </g>
      <g>
        <path className="st1" d="M100,175.5c-9.47,0-18.72-1.74-27.5-5.18V29.68c8.78-3.44,18.03-5.18,27.5-5.18c9.47,0,18.72,1.74,27.5,5.18 v140.63C118.72,173.76,109.47,175.5,100,175.5z"/>
        <path className="st2" d="M100,26c8.94,0,17.68,1.59,26,4.71v138.57c-8.32,3.13-17.06,4.71-26,4.71s-17.68-1.59-26-4.71V30.71 C82.32,27.59,91.06,26,100,26 M100,23c-10.26,0-20.05,2.02-29,5.67v142.66c8.95,3.64,18.74,5.67,29,5.67s20.05-2.02,29-5.67V28.67 C120.05,25.02,110.26,23,100,23L100,23z"/>
      </g>
      <path className="st3" d="M102,23.05c-0.67-0.02-1.33-0.05-2-0.05s-1.33,0.03-2,0.05V63h4V23.05z"/>
    </g>
  )
}