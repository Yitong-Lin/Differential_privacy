import DifferentialPrivacy from './differential-privacy';  
import RSAEncryption from './rsa-encryption';  
  
class FedCampusAPI {  
  /**  
   * 发送健康数据到服务器（包含差分隐私处理）  
   */  
  static async sendHealthData(healthData, userInfo) {  
    try {  
      // 应用差分隐私  
      const fuzzedData = DifferentialPrivacy.fuzzHealthData(healthData);  
        
      // RSA加密  
      const encryptedOriginal = await RSAEncryption.encrypt(  
        JSON.stringify(healthData),   
        userInfo.publicKey  
      );  
      const encryptedFuzzed = await RSAEncryption.encrypt(  
        JSON.stringify(fuzzedData),   
        userInfo.publicKey  
      );  
        
      // 创建请求  
      const originalRequest = {  
        timestamp: BigInt(Date.now()),  
        "api-type": this.getApiType(),  
        pubkey: userInfo.userId,  
        data: encryptedOriginal  
      };  
        
      const fuzzedRequest = {  
        timestamp: BigInt(Date.now()),  
        "api-type": this.getApiType(),   
        pubkey: userInfo.userId,  
        data: encryptedFuzzed  
      };  
        
      // 并行发送原始数据和差分隐私数据  
      const responses = await Promise.all([  
        this.sendDataToEndpoint('/api/data', originalRequest),  
        this.sendDataToEndpoint('/api/data_dp', fuzzedRequest)  
      ]);  
        
      return responses;  
    } catch (error) {  
      console.error('发送健康数据失败:', error);  
      throw error;  
    }  
  }  
    
  static async sendDataToEndpoint(endpoint, requestData) {  
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify(requestData)  
    });  
      
    return response;  
  }  
    
  static getApiType() {  
    // 根据平台返回对应的API类型  
    if (Platform.OS === 'android') {  
      return 3; // Health Connect 或 4: Huawei Health  
    } else {  
      return 2; // HealthKit  
    }  
  }  
}  
  
export default FedCampusAPI;
