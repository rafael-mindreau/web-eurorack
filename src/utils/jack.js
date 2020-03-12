export const getJackById = (jackIdToLookFor, listOfAllJacks) => {
  let foundJack = null;
  listOfAllJacks.some((jack) => {
    const { id: currentJackId } = jack;
    if (currentJackId === jackIdToLookFor) {
      foundJack = jack;
      return true;
    }

    return false;
  });

  return foundJack;
};

export const JACK_TYPES = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT'
};
