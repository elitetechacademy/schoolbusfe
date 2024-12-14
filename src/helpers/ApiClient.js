import axios from "axios";
import { toast } from 'react-toastify';

const ApiClient = axios.create({
  baseURL: "https://ibrahimarac.com/api/",//import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

ApiClient.interceptors.request.use(
  (config) => {
    // Token'i localStorage veya başka bir yerden al
    const user = JSON.parse(localStorage.getItem('user-info'));
    const token = user?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          let toastType = (error.response.data.validationErrors && error.response.data.validationErrors.length > 0) ? "warning" : "error";
          let messageBody = toastType == "warning" ? error.response.data.validationErrors[0] : error.response.data.message;
          toast(messageBody, {
            type: toastType
          });
          Promise.resolve(error.response);
          return error.response.data;
        case 401:
        case 403:
          toast.error('Bu içeriği görme yetkiniz bulunmamaktadır.', {
            onClose: () => {
              if (location.href.indexOf('login') < 0)
                location.href = '/login'
            }
          });
          break;
        case 404: // Kaynak bulunamadı
          toast.error('Erişilmeye çalışılan içerik bulunamadı.');
          break;
        case 500: // Sunucu hatası
          toast.error('Sunucu taraflı bir problem oluştu.');
          break;
        default:
          toast.error(`Sunucu taraflı bir problem oluştu.${status}`);
      }
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      toast.error(`Sunucudan yanıt alınamadı.`);
    } else {
      // İstek yapılandırılırken bir hata oluştu
      toast.error(`Bir hata oluştu.${error.message}`);
    }

    return Promise.reject(error); // Hata kontrolünü çağıran fonksiyona ilet
  }
);


export default ApiClient;