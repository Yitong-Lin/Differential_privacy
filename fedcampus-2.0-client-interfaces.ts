// 客户端到服务器请求接口  

interface HealthDataPoint {  
  timestamp: bigint;        // <long>  
  data: {  
    value: number;          // <int> 对应steps: int, climb: int  
  };  
}  
  
// 血压数据点（支持多个值）  
interface BloodPressurePoint {  
  timestamp: bigint;        // <long>  
  data: {  
    [key: string]: number;  // 支持xxx1: int, xxx2: int等多个血压值  
  };  
}  
  
// 睡眠时长数据点  
interface SleepDataPoint {  
  timestamp: bigint;        // <long>  
  data: {  
    value: bigint;          // <long> sleep_duration: long (ms)  
  };  
}  
  
// 其他浮点数据点  
interface FloatDataPoint {  
  timestamp: bigint;        // <long>  
  data: {  
    value: number;          // <float> 其余均为float  
  };  
}

// 重命名以更清晰地表示整数数据点  
interface IntegerDataPoint {  
  timestamp: bigint;        // <long>  
  data: {  
    value: number;          // <int> 对应steps, flight_climbed  
  };  
}  
  
// 使用更具体的类型别名  
type HealthDataPoint = IntegerDataPoint;

interface FedCampusRequest {  
  timestamp: bigint;        // <long> 请求时间  
  "api-type": number;       // <int> 1: Google Fit, 2: HealthKit, 3: Health Connect, 4: Huawei Health  
  pubkey: string;           // <UID> 用户公钥标识  
  data: string;             // <RSA block> RSA加密的健康数据JSON字符串  
}  
  

// RSA解密后的健康数据结构（完整版）  
interface DecryptedHealthData {  
  // 整数类型数据  
  steps?: HealthDataPoint[];              // int  
  flight_climbed?: HealthDataPoint[];     // int (爬楼层数)  
    
  // 长整型数据    
  sleep_duration?: SleepDataPoint[];      // long (ms)  
    
  // 浮点数类型数据  
  distances?: FloatDataPoint[];           // float  
  active_calories?: FloatDataPoint[];     // float    
  exercises?: FloatDataPoint[];           // float  
  heart_rate?: FloatDataPoint[];          // float  
  stress_level?: FloatDataPoint[];        // float  
  irregular_rhythm?: FloatDataPoint[];    // float  
  respiratory_rate?: FloatDataPoint[];    // float  
    
  // 特殊数据类型  
  blood_pressure?: BloodPressurePoint[];  // 多值数据  
    
  // 索引签名支持其他数据类型  
  [dataType: string]: HealthDataPoint[] | BloodPressurePoint[] | SleepDataPoint[] | FloatDataPoint[] | undefined;  
}  
  

// 平台数据源映射接口  
interface PlatformDataMapping {  
  // Android/Huawei Health数据源  
  android: {  
    steps: 'DT_CONTINUOUS_STEPS_DELTA',  
    distances: 'DT_CONTINUOUS_DISTANCE_DELTA',   
    flight_climbed: 'DT_CONTINUOUS_STEPS_DELTA', // 需要特殊处理  
    active_calories: 'DT_CONTINUOUS_CALORIES_BURNT',  
    sleep_duration: 'DT_HEALTH_RECORD_SLEEP',  
    heart_rate: 'DT_INSTANTANEOUS_HEART_RATE',  
    stress_level: 'DT_INSTANTANEOUS_STRESS'  
  };  
    
  // iOS HealthKit数据源    
  ios: {  
    steps: 'HealthDataType.STEPS',  
    distances: 'HealthDataType.DISTANCE_WALKING_RUNNING',  
    active_calories: 'HealthDataType.ACTIVE_ENERGY_BURNED',   
    sleep_duration: 'HealthDataType.SLEEP_ASLEEP',  
    heart_rate: 'HealthDataType.HEART_RATE'  
  };  
}

