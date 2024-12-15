import { create } from 'zustand';

const loginStore = create(
    (set) => ({
    loginStatus: {
        isLogged: false,
        user: {
            userId : 0,
            roleId : 0,
            token : ''
        }
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