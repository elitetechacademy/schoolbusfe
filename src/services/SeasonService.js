import ApiClient from '../helpers/ApiClient'

class SeasonService {
    GetAllAsyc = async () => {
        try {
            const response = await ApiClient.get("season/get-all");
            return response;
        } catch (error) {
            console.log(`SeasonService => GetAllAsync : ${error}`);
        }

    }
}

export default new SeasonService();