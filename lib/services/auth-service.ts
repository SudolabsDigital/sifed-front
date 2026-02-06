import api from "@/lib/api";

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    foto_url?: string;
  };
  token: string;
}

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/login', { email, password });
    return data;
  },

  logout: async (): Promise<void> => {
    await api.post('/logout');
  },

  me: async (): Promise<LoginResponse['user']> => {
    const { data } = await api.get<LoginResponse['user']>('/me');
    return data;
  }
};
