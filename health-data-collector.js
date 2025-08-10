import { NativeModules, Platform } from 'react-native';  
import { PlatformDataMapping } from './fedcampus-2.0-client-interfaces';  
  
const { HealthDataModule } = NativeModules;  
  
class HealthDataCollector {  
  /**  
   * 获取指定日期的健康数据  
   * @param {Array<string>} dataTypes - 数据类型数组  
   * @param {number} date - 日期（YYYYMMDD格式）  
   * @returns {Promise<Object>} 健康数据对象  
   */  
  static async getHealthData(dataTypes, date) {  
    const healthData = {};  
      
    for (const dataType of dataTypes) {  
      try {  
        const platformDataType = this.getPlatformDataType(dataType);  
        const rawData = await HealthDataModule.getData(  
          platformDataType,  
          this.dateToTimestamp(date),  
          this.dateToTimestamp(date + 1)  
        );  
          
        healthData[dataType] = this.convertToStandardFormat(rawData, dataType);  
      } catch (error) {  
        console.error(`获取${dataType}数据失败:`, error);  
        healthData[dataType] = [];  
      }  
    }  
      
    return healthData;  
  }  
  
  /**  
   * 获取平台特定的数据类型标识符  
   */  
  static getPlatformDataType(dataType) {  
    const mapping = Platform.OS === 'android'   
      ? PlatformDataMapping.android   
      : PlatformDataMapping.ios;  
      
    return mapping[dataType] || dataType;  
  }  
  
  /**  
   * 将原生数据转换为标准格式  
   */  
  static convertToStandardFormat(rawData, dataType) {  
    if (!Array.isArray(rawData)) return [];  
      
    return rawData.map(item => {  
      const timestamp = BigInt(item.timestamp || Date.now());  
        
      if (dataType === 'sleep_duration') {  
        return {  
          timestamp,  
          data: {  
            value: BigInt(item.value || 0)  
          }  
        };  
      } else if (dataType === 'blood_pressure') {  
        return {  
          timestamp,  
          data: {  
            systolic: item.systolic || 0,  
            diastolic: item.diastolic || 0  
          }  
        };  
      } else if (['steps', 'flight_climbed'].includes(dataType)) {  
        return {  
          timestamp,  
          data: {  
            value: Math.round(item.value || 0)  
          }  
        };  
      } else {  
        // 浮点数类型  
        return {  
          timestamp,  
          data: {  
            value: parseFloat(item.value || 0)  
          }  
        };  
      }  
    });  
  }  
  
  /**  
   * 日期转时间戳  
   */  
  static dateToTimestamp(date) {  
    const dateStr = date.toString();  
    const year = parseInt(dateStr.substring(0, 4));  
    const month = parseInt(dateStr.substring(4, 6)) - 1;  
    const day = parseInt(dateStr.substring(6, 8));  
      
    return new Date(year, month, day).getTime();  
  }  
  
  /**  
   * 请求健康数据权限  
   */  
  static async requestPermissions(dataTypes) {  
    try {  
      const permissions = dataTypes.map(type => this.getPlatformDataType(type));  
      const granted = await HealthDataModule.requestPermissions(permissions);  
      return granted;  
    } catch (error) {  
      console.error('请求健康数据权限失败:', error);  
      return false;  
    }  
  }  
}  
  
export default HealthDataCollector;
