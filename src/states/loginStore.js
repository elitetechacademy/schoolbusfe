import { create } from 'zustand';

const loginStore = create(
    (set) => ({
    loginStatus: {
        isLogged: true,
        role: '',
    },
    setLoginStatus: (newStatus) =>
        set((state) => ({
            loginStatus: {
                ...state.loginStatus,
                ...newStatus
            },
        })),
}));

export default loginStore;