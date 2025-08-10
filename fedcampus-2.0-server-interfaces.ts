// 服务器到客户端响应接口  
interface ServerResponse {  
  timestamp: bigint;        // <long> 请求时间  
  pubkey: string;           // <UID> 用户公钥标识  
  data: string;             // <RSA block> RSA加密的统计数据JSON字符串  
}  
  
// RSA解密后的统计数据结构  
interface DecryptedStatisticalData {  
  [dataType: string]: {  
    timestamp: bigint;      // <long>  
    data: GroupStatistics[];  
  };  
}  
  
// 分组统计数据  
interface GroupStatistics {  
  group: 'all' | 'male' | 'female' | 'ug-2025' | 'g-2025' | 'staff' | 'faculty';  
  percent: number;          // <float>  
  samples: number[];        // [<int>, <int>, ...] 根据数据类型可能是int或float  
}
