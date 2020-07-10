import {
  HORIZONTAL_PITCH_TO_PIXEL_RATIO,
} from '../constants/units';

export const translateCoordinatesForJack = (jack, offset) => {
  const translatedJack = {
    ...jack,
    x: jack.x + (offset * HORIZONTAL_PITCH_TO_PIXEL_RATIO),
  };

  return translatedJack;
}

export const translateGlobalCoordinatesToLocal = (x, y, offsetX, offsetY) => ({
  x: x - offsetX,
  y: y - offsetY,
})

export const cartesianToPolar = (x, y, { x: originX, y: originY }) => {
  // Coordinates are floating in space, make them relative to origins
  const normalizedCoordinates = {
    x: x - originX,
    y: y - originY,
  };

  return {
    angle: Math.atan2(normalizedCoordinates.y, normalizedCoordinates.x) * (180 / Math.PI),
    radius: Math.sqrt(Math.pow(normalizedCoordinates, 2) + Math.pow(normalizedCoordinates, 2)),
  };
}
