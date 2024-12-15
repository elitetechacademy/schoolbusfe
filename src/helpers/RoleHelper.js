import RoleType from "../utils/types/RoleType";

class RoleHelper {
    GetUserRole = () => {
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        let roleType = RoleType.Guest;
        if (userInfo) {
            switch (userInfo.roleId) {
                case 2:
                    roleType = RoleType.SuperAdmin;
                    break;
                case 4:
                    roleType = RoleType.Admin;
                    break;
                case 5:
                    roleType = RoleType.User;
                    break;
                default:
                    break;
            }
        }
        return roleType;
    }
}

export default new RoleHelper();