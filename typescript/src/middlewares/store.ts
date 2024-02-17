import { Auth } from '@models/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useStore = create<Auth>()(
  persist(
    (set) => ({
      token: { access_token: '' },
      setToken: (token) => set(() => ({ token: token })),
    }),
    { name: 'auth' },
  ),
);

export default useStore;