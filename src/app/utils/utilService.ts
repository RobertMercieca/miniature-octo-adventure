function capitalizeFirstLetter(word: string | null | undefined): string {
  if (!word || !word.length) {
    return '';
  }

  return word.charAt(0).toUpperCase() + word.substring(1);
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

function prettifyNumber(
  value: number,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2
): string {
  if (isUndefined(value)) {
    return '';
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits,
    minimumFractionDigits,
  });
}

const utilService = {
  capitalizeFirstLetter,
  randomNumber,
  isUndefined,
  prettifyNumber,
};

export default utilService;
