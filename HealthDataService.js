// 替代 fedcampus/lib/models/health_data_model.dart 中的 _sentToServer 方法  
import DifferentialPrivacy from './DifferentialPrivacy';  
import { showToast } from 'react-native-toast-message';  
  
class HealthDataService {  
  static async sendToServer(dataList) {  
    try {  
      // 数据编码 - 替代 dataListJsonEncode  
      const dataJson = JSON.stringify(dataList.map(data => ({  
        name: data.name,  
        value: data.value,  
        startTime: data.startTime,  
        endTime: data.endTime  
      })));  
        
      const dataFuzzJson = JSON.stringify(  
        DifferentialPrivacy.fuzzData(dataList).map(data => ({  
          name: data.name,  
          value: data.value,  
          startTime: data.startTime,  
          endTime: data.endTime  
        }))  
      );  
  
      // 并行发送 - 替代 Future.wait()  
      const responses = await Promise.all([  
        this.sendData(dataJson, false),  
        this.sendData(dataFuzzJson, true)  
      ]);  
  
      // 日志记录 - 替代 logger.i  
      console.log(`Data Status Code ${responses[0].status}: ${dataJson}`);  
      console.log(`Data DP Status Code ${responses[1].status}: ${dataFuzzJson}`);  
  
      // 状态码处理  
      if (responses[0].status === 401) {  
        this.showToast("Please Login for federated analysis.");  
      } else if (responses[0].status === 200) {  
        this.showToast("success");  
      }  
  
    } catch (error) {  
      if (error.name === 'TimeoutError') {  
        this.remindDkuNetwork();  
      } else {  
        console.error('Error sending data:', error);  
        this.showToast("Unknown issue. Please try again later.");  
      }  
    }  
  }  
  
  static async sendData(jsonData, isDifferentialPrivacy = false) {  
    const endpoint = isDifferentialPrivacy ? '/api/data_dp' : '/api/data';  
    const url = `${API_BASE_URL}${endpoint}`;  
  
    const controller = new AbortController();  
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时  
  
    try {  
      const response = await fetch(url, {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
          'Authorization': `Token ${await this.getAuthToken()}`,  
        },  
        body: jsonData,  
        signal: controller.signal,  
      });  
        
      clearTimeout(timeoutId);  
      return response;  
    } catch (error) {  
      clearTimeout(timeoutId);  
      throw error;  
    }  
  }  
  
  static showToast(message) {  
    showToast({  
      type: message === "success" ? 'success' : 'error',  
      text1: message,  
      position: 'center',  
      visibilityTime: 1000,  
    });  
  }  
  
  static remindDkuNetwork() {  
    this.showToast("Please make sure you are connected to DKU network!");  
  }  
}  
  
export default HealthDataService;
