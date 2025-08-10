// 替代 Flutter 特定的错误处理  
class ErrorHandler {  
  static handlePlatformException(error) {  
    if (error.message?.includes('50005')) {  
      console.log("not authenticated");  
      return 'AUTH_ERROR';  
    } else if (error.message?.includes('50030')) {  
      console.log("internet issue");  
      return 'NETWORK_ERROR';  
    }  
    return 'UNKNOWN_ERROR';  
  }  
  
  static async getDayDataAndSendAndTrain(date) {  
    try {  
      const data = await this.getDataList(HealthDataConfig.dataNameList, date);  
      const dataFuzz = DifferentialPrivacy.fuzzData(data);  
        
      await HealthDataService.sendToServer(data);  
        
    } catch (error) {  
      const errorType = this.handlePlatformException(error);  
        
      switch (errorType) {  
        case 'AUTH_ERROR':  
          // 处理认证错误  
          break;  
        case 'NETWORK_ERROR':  
          HealthDataService.remindDkuNetwork();  
          break;  
        default:  
          console.error('Unknown error:', error);  
          HealthDataService.showToast("Unknown issue. Please try again later.");  
      }  
        
      throw error;  
    }  
  }  
}  
  
export default ErrorHandler;
