// 替代 fedcampus/lib/pigeon/datawrapper.dart 中的 fuzzData 方法  
import { boxMuller } from './utils/RandomUtils'; 
  
class DifferentialPrivacy {  
  // 替代 truncatedNormalSample 函数  
  static truncatedNormalSample(length, min, max, mean, std) {  
    const errors = [];  
    for (let i = 0; i < length; i++) {  
      let sample;  
      do {  
        sample = boxMuller() * std + mean; 
      } while (sample < min || sample > max);  
      errors.push(sample);  
    }  
    return errors;  
  }  
  
  static fuzzData(dataList) {  
    const errors = this.truncatedNormalSample(dataList.length, -10, 10, 0, 1);  
    const result = [];  
  
    for (let i = 0; i < dataList.length; i++) {  
      const data = dataList[i];  
        
      if (data.name === "sleep_duration") {  
        const start = Math.floor(data.value / 10000);  
        const end = Math.floor(data.value % 10000);  
        const fuzzedStart = start + errors[i] * 10;  
        const fuzzedEnd = end + errors[i] * 10;  
        const fuzzedSleepDuration = fuzzedStart * 10000 + fuzzedEnd;  
          
        result.push({  
          name: data.name,  
          value: fuzzedSleepDuration,  
          startTime: data.startTime,  
          endTime: data.startTime,  
        });  
      } else {  
        result.push({  
          name: data.name,  
          value: data.value + errors[i] * 10,  
          startTime: data.startTime,  
          endTime: data.startTime,  
        });  
      }  
    }  
      
    return result;  
  }  
}  
  
export default DifferentialPrivacy;
