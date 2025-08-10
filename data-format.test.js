describe('数据格式测试', () => {  
  test('RSA加密解密流程', async () => {  
    const testData = { steps: [{ timestamp: BigInt(Date.now()), data: { value: 5000 } }] };  
    const encrypted = await RSAEncryption.encrypt(JSON.stringify(testData), publicKey);  
    const decrypted = await RSAEncryption.decrypt(encrypted, privateKey);  
    expect(JSON.parse(decrypted)).toEqual(testData);  
  });  
});
