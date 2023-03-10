export interface Login {
  success: boolean;
  data: {
    result: {
      access_token: string;
      token_type: string;
      id: number;
      name: string;
      user_role: number;
    };
    require_password_change: number;
  };
  message: string;
}
