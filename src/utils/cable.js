/**
 * Checks to see if a cable already exists in the set of all cables
 * @param  {Object} cable            A cable object containing two connected Jacks (JackA, JackB)
 * @param  {Object} allCables        A dict containing all the cables currently patched
 * @return {Boolean}                 True if the cable already exists
 */
export const alreadyExists = ({ jackA: currentJackA, jackB: currentJackB }, allCables) => {
  return Object.keys(allCables).some((cableId) => {
    const { jackA: existingJackA, jackB: existingJackB } = allCables[cableId];
    return currentJackA.id === existingJackA.id && currentJackB.id === existingJackB.id;
  });
};

export const isSelfPatched = (cable) => {
  const { jackA, jackB } = cable;

  return jackA.id === jackB.id;
};
