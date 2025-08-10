import DifferentialPrivacy from './differential-privacy';  
  
describe('DifferentialPrivacy', () => {  
  test('应该正确对步数数据添加噪声', () => {  
    const testData = {  
      steps: [{  
        timestamp: BigInt(Date.now()),  
        data: { value: 10000 }  
      }]  
    };  
      
    const fuzzedData = DifferentialPrivacy.fuzzHealthData(testData);  
    expect(fuzzedData.steps[0].data.value).not.toBe(10000);  
    expect(typeof fuzzedData.steps[0].data.value).toBe('number');  
  });  
});
