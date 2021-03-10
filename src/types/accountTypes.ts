export interface AccountState {
  loggedIn: boolean;
  isLoading: boolean;
  token: string | null;
  username: string | null;
}

export interface AuthPayload {
  username: string;
  password: string;
}
