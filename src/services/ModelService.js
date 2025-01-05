import ApiClient from '../helpers/ApiClient'

class ModelService{
    GetAllAsync = async ()=>{
        try {
            const response = await ApiClient.get("model/get-all");
            return response;
        } catch (error) {
            console.log(`ModelService => GetAllAsync : ${error}`);
        }        
    }

    CreateAsync = async (values)=>{
        try {
            const response = await ApiClient.post("model/create",values);
            return response;
        } catch (error) {
            console.log(`ModelService => CreateAsync : ${error}`);
        }      
    }

    UpdateAsync = async (values)=>{
        try {
            const response = await ApiClient.put("model/update", values);
            return response;
        } catch (error) {
            console.log(`ModelService => UpdateAsync : ${error}`);
        }      
    }

    DeleteAsync = async (id)=>{
        try {
            const response = await ApiClient.delete(`model/delete/${id}`);
            return response;
        } catch (error) {
            console.log(`ModelService => DeleteAsync : ${error}`);
        }      
    }
}

export default new ModelService()