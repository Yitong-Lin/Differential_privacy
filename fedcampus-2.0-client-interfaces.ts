// 客户端到服务器请求接口  
interface FedCampusRequest {  
  timestamp: bigint;        // <long> 请求时间  
  "api-type": number;       // <int> 1: Google Fit, 2: HealthKit, 3: Health Connect, 4: Huawei Health  
  pubkey: string;           // <UID> 用户公钥标识  
  data: string;             // <RSA block> RSA加密的健康数据JSON字符串  
}  
  
// RSA解密后的健康数据结构  
interface DecryptedHealthData {  
  steps?: HealthDataPoint[];  
  blood_pressure?: BloodPressurePoint[];  
  sleep_duration?: SleepDataPoint[];  
  climb?: HealthDataPoint[];  
  [dataType: string]: HealthDataPoint[] | BloodPressurePoint[] | SleepDataPoint[] | undefined;  
}  
  
// 标准健康数据点（steps, climb等）  
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
