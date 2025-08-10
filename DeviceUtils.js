// 替代设备ID获取  
import DeviceInfo from 'react-native-device-info';  
  
class DeviceUtils {  
  static async getDeviceId() {  
    try {  
      return await DeviceInfo.getUniqueId();  
    } catch (error) {  
      console.error('Error getting device ID:', error);  
      return 'unknown-device';  
    }  
  }  
}  
  
export default DeviceUtils;
