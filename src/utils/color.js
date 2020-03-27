export const getRGBFromHex = (hex) => {
  const hexWithoutHashTag = hex.substring(1, hex.length);

  const R = parseInt(hexWithoutHashTag.substring(0,2), 16);
  const G = parseInt(hexWithoutHashTag.substring(2,4), 16);
  const B = parseInt(hexWithoutHashTag.substring(4,6), 16);

  return { R, G, B };
};

export const isDarkColor = (color) => {
  const threshold = (255 * 3) / 2; // 50%
  const { R, G, B } = getRGBFromHex(color);

  return (R + G + B) < threshold;
};
