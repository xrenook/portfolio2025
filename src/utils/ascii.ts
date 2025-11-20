export const ASCII_CHARS = " .:-=+*#%@";

export const generateAscii = (width: number, height: number, density: number = 1): string => {
  let art = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (Math.random() < density) {
        const charIndex = Math.floor(Math.random() * ASCII_CHARS.length);
        art += ASCII_CHARS[charIndex];
      } else {
        art += " ";
      }
    }
    art += "\n";
  }
  return art;
};

export const textToAscii = (text: string): string => {
  // Placeholder for text-to-ascii logic or integration with a library
  // For now, return the text wrapped in a simple box
  const border = "+".padEnd(text.length + 4, "-") + "+";
  return `${border}\n| ${text} |\n${border}`;
};
