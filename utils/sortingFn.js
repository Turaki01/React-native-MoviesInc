export const sortingTitleAlphabetically = (sortingArray, key) => {
  if (key) {
    return sortingArray.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    return sortingArray;
  }
};
