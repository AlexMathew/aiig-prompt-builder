const BASE_FIRST_PART = [
  "An astronaut",
  "A Golden Retriever",
  "A tabby cat",
  "A football referee",
  "A professional chef",
  "Two yellow ducks",
];

const BASE_SECOND_PART = [
  "on a beach",
  "in a boat",
  "with a large balloon",
  "riding a horse",
  "playing basketball",
  "on the moon",
  "working on a laptop",
  "in an inflatable pool",
];

export const getRandomSelectionFromArray = (collection: string[]) => {
  return collection[Math.floor(Math.random() * collection.length)];
};

export const getRandomBasePrompt = () => {
  return `${getRandomSelectionFromArray(
    BASE_FIRST_PART
  )} ${getRandomSelectionFromArray(BASE_SECOND_PART)}`;
};
