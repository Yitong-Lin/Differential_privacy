// __mocks__/react-native-rsa-native.js
module.exports = {
  generateKeys: jest.fn(async (keySize = 2048) => ({
    public: '-----BEGIN PUBLIC KEY-----MOCK-----END PUBLIC KEY-----',
    private: '-----BEGIN PRIVATE KEY-----MOCK-----END PRIVATE KEY-----',
  })),
  encrypt: jest.fn(async (plain, publicKey) => `enc(${plain})`),
  decrypt: jest.fn(async (cipher, privateKey) => cipher.replace(/^enc\(/, '').replace(/\)$/, '')),
  generate: jest.fn(async () => 'MOCK_RSA'), // 如果你的实现用到了 generate
};
