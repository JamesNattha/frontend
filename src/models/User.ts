export interface CreateUserValues {
  first_name: string;
  last_name: string;
  sex: boolean;
  phone: string;
}

export interface GetUserValues {
  id: string;
}

export interface ApiData {
  user_id: number;
  first_name: string;
  last_name: string;
  sex: boolean;
  phone: string;
  created_date: string;
}
