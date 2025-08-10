// 替代 sample_statistics 包  
export function boxMuller() {  
  let u = 0, v = 0;  
  while(u === 0) u = Math.random(); 
  while(v === 0) v = Math.random();  
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);  
}
