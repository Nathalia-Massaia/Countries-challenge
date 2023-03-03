export type CountryProps = {
  name: {
    common: string;
  };
  cca3: string;
  independent: boolean;
  currencies: {
    ['name']: {
      name: string;
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    ['name']: string;
  };
  area: number;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
};
