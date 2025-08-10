// 替代 fedcampus/lib/pigeon/datawrapper.dart 中的 dataNameList  
import { Platform } from 'react-native';  
  
class HealthDataConfig {  
  static get dataNameList() {  
    return Platform.OS === 'android' ? [  
      "step",  
      "calorie",  
      "distance",   
      "stress",  
      "rest_heart_rate",  
      "intensity",  
      "exercise_heart_rate",  
      "step_time",  
      "sleep_efficiency",  
      "sleep_time",  
      "sleep_duration",  
      "fall_asleep_time",  
      "wakeup_time",  
    ] : [  
      "step",  
      "distance",  
      "rest_heart_rate",   
      "avg_heart_rate",  
      "calorie",  
      "sleep_time",  
      "sleep_duration",  
      "carbon_emission",  
    ];  
  }  
}  
  
export default HealthDataConfig;
