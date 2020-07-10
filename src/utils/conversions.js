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
