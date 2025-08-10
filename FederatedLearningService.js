// 替代 fedcampus/lib/pigeon/datawrapper.dart 中的联邦学习相关方法  
import DeviceInfo from 'react-native-device-info';  
  
class FederatedLearningService {  
  // 替代 _wrap2DArrayInput 方法  
  static wrap2DArrayInput(result) {  
    const xTrue = new Map();  
      
    for (const [key, value] of Object.entries(result)) {  
      const keyArray = JSON.parse(key);  
      const valueArray = Array.isArray(value) ? value : [value];  
        
      const twoDarrayTrue = [];  
      for (const onedarray of keyArray) {  
        const onedarrayList = [];  
        for (const i of onedarray) {  
          onedarrayList.push(parseFloat(i));  
        }  
        twoDarrayTrue.push(onedarrayList);  
      }  
      xTrue.set(twoDarrayTrue, [parseFloat(valueArray[0])]);  
    }  
      
    return xTrue;  
  }  
  
  // 替代 getDataAndTrain 方法的核心逻辑  
  static async startTrainingLoop(dataList, startTime, date) {  
    const loadDataResult = await this.loadData(dataList, startTime, date);  
    const result = this.wrap2DArrayInput(loadDataResult);  
    const deviceId = await DeviceInfo.getUniqueId();  
      
    const host = '10.201.8.66'; // TODO: Remove hardcode  
    const backendUrl = `http://${host}:8000`;  
      
    while (true) {  
      await new Promise(resolve => setTimeout(resolve, 5000)); 
        
      try {  
        const training = new FedmcrnnTraining();  
        await training.prepare(host, backendUrl, result, deviceId);  
          
        const trainingPromise = new Promise((resolve, reject) => {  
          training.train.start().subscribe({  
            next: (info) => console.log('Training info:', info),  
            complete: () => resolve(true),  
            error: (error) => reject(error)  
          });  
        });  
          
        const succeeded = await trainingPromise;  
        if (succeeded) {  
          await new Promise(resolve => setTimeout(resolve, 5000));  
        }  
          
        await this.sendLogFileToServer();  
      } catch (error) {  
        console.error('Training error:', error);  
      }  
    }  
  }  
  
  static async sendLogFileToServer() {  
    // 替代 sendLogFileToServer 方法  
    console.log("Sending Log File to Server");  
    // 实际发送逻辑根据需要实现  
  }  
}  
  
export default FederatedLearningService;
