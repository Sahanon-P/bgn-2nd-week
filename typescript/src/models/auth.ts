interface Token {
    access_token: string;
  }
export interface Auth {
    token: Token;
    setToken: (token: Token) => void;
  }