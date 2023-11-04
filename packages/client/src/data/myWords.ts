type Word = {
  sourceUrl: string; // such as https://www.dictionaryofobscuresorrows.com/
  type: 'modern' | 'archaic' | 'sci-fi'; // for words like "sophont" which are widespread in a limited community.
  origin: 'german' | 'latin'; // to address "Spannungsbogen" or "tempus fugit"
  usage: 'exclamatory'; // for "tempus fugit"
  validated: true | false; // validated by a dictionary or by being approved manually
};
