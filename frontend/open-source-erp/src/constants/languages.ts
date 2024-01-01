const languages = {
  eng: {
    label: 'ENG',
    value: 'en',
    countryCode: 'GB',
  },
  ita: {
    label: 'ITA',
    value: 'it',
    countryCode: 'IT',
  },
};

export function countryCodeToFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (_char: string, index: number) =>
      String.fromCodePoint(127397 + countryCode.charCodeAt(index))
    );
}

export default languages;
