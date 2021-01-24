export function casefold(s: string){
    return s.normalize('NFKC').toLowerCase();
}

export function msToTime(ms: number, startFrom: number = 0){
    const scales = [1000, 60, 60, 24];
    let result = [];
    let currVal = Math.floor([ms, ...scales.slice(0, startFrom)].reduce((total, num)=>{
      return total / num;
    }));
    for(let i = startFrom; i < scales.length; i++){
      const currScale = currVal % scales[i];
      currVal = (currVal - currScale) / scales[i];
      result.unshift(currScale);
      if(currVal <= 0) break;
    }
    return result.join(':');
}

export function msToTimePattern(ms, pattern = "mm:ss"){
  if(!ms) return "00:00";
  const scales = [['f', 1000], ['s', 60], ['m', 60], ['h', 24]];
  let res = pattern.split('');
  let currVal = ms;
  for(const s of scales){
    const currScale = currVal % Number(s[1]);
    currVal = (currVal - currScale) / Number(s[1]);
    const numStr = Math.floor(currScale).toString();
    let i = numStr.length -1;
    for(let j = res.length -1; j >= 0; j--){
      if(res[j] == s[0]){
        if(!numStr[i])
          res[j] = '0';
        else
          res[j] = numStr[i];
        i--;
      }
    }
  }
  const isMatching = res.join('').match(/\d.*\d/);
  if(isMatching)
    return isMatching[0];
  return pattern;
}