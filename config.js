import { Platform } from 'react-native';  
  
const Config = {  
  // API配置  
  API: {  
    BASE_URL: 'http://10.201.8.66:8000', // 开发环境  
    ENDPOINTS: {  
      DATA: '/api/data',  
      DATA_DP: '/api/data_dp',  
      LOGIN: '/api/login',  
      REGISTER: '/api/register',  
      LOGOUT: '/auth/token/logout/',  
      STATISTICS: '/api/avg',  
      RANK: '/api/rank',  
      STATUS: '/api/status'  
    },  
    TIMEOUT: 5000  
  },  
  
  // 健康数据类型配置  
  HEALTH_DATA_TYPES: {  
    INTEGER_TYPES: ['steps', 'flight_climbed'],  
    LONG_TYPES: ['sleep_duration'],  
    FLOAT_TYPES: [  
      'distances', 'active_calories', 'exercises',   
      'heart_rate', 'stress_level', 'irregular_  
  
Wiki pages you might want to explore:  
- [Overview (FedCampus/FedCampus_Flutter)](/wiki/FedCampus/FedCampus_Flutter#1)  
- [Health Data Management (FedCampus/FedCampus_Flutter)](/wiki/FedCampus/FedCampus_Flutter#2.1)  
- [Network Communication and APIs (FedCampus/FedCampus_Flutter)](/wiki/FedCampus/FedCampus_Flutter#2.4)
