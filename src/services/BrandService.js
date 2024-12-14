import ApiClient from '../helpers/ApiClient'

class BrandService{
    GetAllAsync = async ()=>{
        try {
            const response = await ApiClient.get("brand/get-all");
            return response;
        } catch (error) {
            console.log(`BrandService => GetAllAsync : ${error}`);
        }        
    }

    CreateAsync = async (values)=>{
        try {
            const response = await ApiClient.post("brand/create",values);
            return response;
        } catch (error) {
            console.log(`BrandService => CreateAsync : ${error}`);
        }      
    }

    UpdateAsync = async (values)=>{
        try {
            const response = await ApiClient.put("brand/update", values);
            return response;
        } catch (error) {
            console.log(`BrandService => UpdateAsync : ${error}`);
        }      
    }

    DeleteAsync = async (id)=>{
        try {
            const response = await ApiClient.delete(`brand/delete/${id}`);
            return response;
        } catch (error) {
            console.log(`BrandService => DeleteAsync : ${error}`);
        }      
    }
}

export default new BrandService()