import { truncatedNormalSample } from './statistics-utils';  
  
class DifferentialPrivacy {  
  /**  
   * 对健康数据应用差分隐私噪声  
   * @param {Object} healthData - 解密后的健康数据，格式为 {dataType: [HealthDataPoint]}  
   * @returns {Object} 加噪后的健康数据  
   */  
  static fuzzHealthData(healthData) {  
    const fuzzedData = {};  
      
    Object.keys(healthData).forEach(dataType => {  
      const dataPoints = healthData[dataType];  
      if (!Array.isArray(dataPoints)) return;  
        
      const fuzzedPoints = dataPoints.map(point => {  
        return this.applyNoiseToDataPoint(point, dataType);  
      });  
        
      fuzzedData[dataType] = fuzzedPoints;  
    });  
      
    return fuzzedData;  
  }  
    
  /**  
   * 对单个数据点应用噪声  
   */  
  static applyNoiseToDataPoint(dataPoint, dataType) {  
    const noise = truncatedNormalSample(1, -10, 10, 0, 1)[0];  
      
    if (dataType === "sleep_duration") {  
      // 特殊处理睡眠数据 - 对开始和结束时间都添加噪声  
      const originalValue = BigInt(dataPoint.data.value);  
      const start = Number(originalValue / 10000n);  
      const end = Number(originalValue % 10000n);  
        
      const fuzzedStart = start + Math.round(noise * 10);  
      const fuzzedEnd = end + Math.round(noise * 10);  
      const fuzzedSleepDuration = BigInt(fuzzedStart * 10000 + fuzzedEnd);  
        
      return {  
        timestamp: dataPoint.timestamp,  
        data: {  
          value: fuzzedSleepDuration  
        }  
      };  
    } else {  
      // 标准噪声处理  
      const originalValue = dataPoint.data.value;  
      const fuzzedValue = originalValue + noise * 10;  
        
      return {  
        timestamp: dataPoint.timestamp,  
        data: {  
          value: fuzzedValue  
        }  
      };  
    }  
  }  
}  
  
export default DifferentialPrivacy;
