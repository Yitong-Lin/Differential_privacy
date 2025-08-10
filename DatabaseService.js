// 替代本地数据库相关操作  
import SQLite from 'react-native-sqlite-storage';  
  
class DatabaseService {  
  constructor() {  
    this.startTime = 20230810; // 对应 dbapi.startTime  
  }  
  
  async getDatabase() {  
    return SQLite.openDatabase(  
      { name: 'health_data.db', location: 'default' },  
      () => console.log('Database opened'),  
      error => console.error('Database error:', error)  
    );  
  }  
  
  // 替代 _findMissingData 方法  
  findMissingData(dataList, date) {  
    let i = this.startTime;  
    const resMissing = [];  
      
    while (i < date) {  
      const hasData = dataList.some(element => element.endTime === i);  
      if (!hasData) {  
        resMissing.push(i);  
      }  
        
      const dateStr = i.toString();  
      const year = parseInt(dateStr.substring(0, 4));  
      const month = parseInt(dateStr.substring(4, 6));  
      const day = parseInt(dateStr.substring(6, 8));  
        
      const nextDate = new Date(year, month - 1, day + 1);  
      i = nextDate.getFullYear() * 10000 +   
          (nextDate.getMonth() + 1) * 100 +   
          nextDate.getDate();  
    }  
      
    return resMissing;  
  }  
  
  async saveToDB(dataList, database) {   
    return new Promise((resolve, reject) => {  
      database.transaction(tx => {  
        dataList.forEach(data => {  
          tx.executeSql(  
            'INSERT OR REPLACE INTO health_data (name, value, startTime, endTime) VALUES (?, ?, ?, ?)',  
            [data.name, data.value, data.startTime, data.endTime],  
            () => {},  
            error => console.error('Insert error:', error)  
          );  
        });  
      }, reject, resolve);  
    });  
  }  
}  
  
export default DatabaseService;
