import ApiClient from "../helpers/ApiClient";

class UserService{
    async LoginAsync(loginModel){
        try {
            const response = await ApiClient.post('user/sign-in', loginModel);
            //oturum açma başarılıysa token'ı localstorage'a ekle
            if(response.isSuccess){
                localStorage.setItem('user-info', JSON.stringify(response.data));
            }
            return response;
        } catch (error) {
            console.log(`UserService => LoginAsync : ${error}`);
        }
    }
}


export default new UserService();