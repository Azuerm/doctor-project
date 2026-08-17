import CryptoJS from 'crypto-js';
export function encryptCity(cityName) {
  if (!cityName) return ''
  const md5Hash = CryptoJS.MD5(cityName).toString()
  return cityName + md5Hash
}