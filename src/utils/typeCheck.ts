const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined';
};

const isNull = (value: any): value is null => {
  return value === null;
};

export const isNil = (value: any): value is null | undefined => {
  return isNull(value) || isUndefined(value);
};
