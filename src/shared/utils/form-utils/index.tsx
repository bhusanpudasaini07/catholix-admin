export const isAnyFieldEmpty = (data: any, fieldNames: any) => {
  // Check if any of the specified field names in the data object is empty or undefined
  return fieldNames.some(
    (fieldName: any) => data[fieldName] === "" || data[fieldName] === undefined
    // ||  data[fieldName] === Object.keys(form.formState.errors)
  );
};

/**
 * Checking number validation digits,backspace,tab,ctrl, c and v
 */
const isDigit = (char: string): boolean => {
  const digits = "0123456789.";
  return digits.includes(char);
};

export const isBackspace = (character: string): boolean => {
  return character === "Backspace";
};

export const isTab = (character: string): boolean => {
  return character === "Tab";
};

export const isCtrl = (character: string): boolean => {
  return character === "Control" || character === "Ctrl";
};

export const isC = (character: string): boolean => {
  return character === "c" || character === "C";
};

export const isV = (character: string): boolean => {
  return character === "v" || character === "V";
};

export const handleKeyDownNumber = (event: any) => {
  const isCtrlPressed = event.ctrlKey || event.metaKey;
  if (
    !isDigit(event.key) &&
    !isBackspace(event.key) &&
    !isTab(event.key) &&
    !isCtrl(event.key) &&
    !(isV(event.key) && isCtrlPressed) &&
    !(isC(event.key) && isCtrlPressed)
  ) {
    event.preventDefault();
  }
};

/**
 * Character validation
 */
const checkCharacter = (value: string): boolean => {
  for (let i = 0; i < value?.length; i++) {
    const charCode = value?.charCodeAt(i);
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      return true;
    }
  }
  return false;
};
export const isSpace = (character: string): boolean => {
  return character === " ";
};

export const isHyphen = (character: string): boolean => {
  return character === "-";
};
export const handleKeyDownAlphabet = (event: any) => {
  if (
    !checkCharacter(event.key) &&
    !isSpace(event.key) &&
    !isHyphen(event.key)
  ) {
    event.preventDefault();
  }
};
