import 'styled-components';
declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      Primary: { Darker: string; Dark: string; Main: string; Light: string; Lighter: string };
      Secondary: { Darker: string; Dark: string; Main: string; Light: string; Lighter: string };
      Error: { Darker: string; Dark: string; Main: string; Light: string; Lighter: string };
      Warning: { Darker: string; Dark: string; Main: string; Light: string; Lighter: string };
      Success: { Darker: string; Dark: string; Main: string; Light: string; Lighter: string };
      Info: { Darker: string; Dark: string; Main: string; Light: string; Lighter: string };
      Gray: {
        Black: string;
        White: string;
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        60: string;
        70: string;
        80: string;
        90: string;
        100: string;
      };
    };
  }
}
