import CryptoJS from 'crypto-js';  
import { RSA } from 'react-native-rsa-native';  
  
class RSAEncryption {  
  /**  
   * RSA加密数据  
   * @param {string} data - 要加密的JSON字符串  
   * @param {string} publicKey - PEM格式的公钥  
   * @returns {Promise<string>} 加密后的base64字符串  
   */  
  static async encrypt(data, publicKey) {  
    try {  
      const encrypted = await RSA.encrypt(data, publicKey);  
      return encrypted;  
    } catch (error) {  
      console.error('RSA加密失败:', error);  
      throw new Error(`RSA加密失败: ${error.message}`);  
    }  
  }  
  
  /**  
   * RSA解密数据  
   * @param {string} encryptedData - 加密的base64字符串  
   * @param {string} privateKey - PEM格式的私钥  
   * @returns {Promise<string>} 解密后的JSON字符串  
   */  
  static async decrypt(encryptedData, privateKey) {  
    try {  
      const decrypted = await RSA.decrypt(encryptedData, privateKey);  
      return decrypted;  
    } catch (error) {  
      console.error('RSA解密失败:', error);  
      throw new Error(`RSA解密失败: ${error.message}`);  
    }  
  }  
  
  /**  
   * 生成RSA密钥对  
   * @param {number} keySize - 密钥长度，默认2048  
   * @returns {Promise<{publicKey: string, privateKey: string}>}  
   */  
  static async generateKeyPair(keySize = 2048) {  
    try {  
      const keys = await RSA.generateKeys(keySize);  
      return {  
        publicKey: keys.public,  
        privateKey: keys.private  
      };  
    } catch (error) {  
      console.error('生成RSA密钥对失败:', error);  
      throw new Error(`生成RSA密钥对失败: ${error.message}`);  
    }  
  }  
}  
  
export default RSAEncryption;
