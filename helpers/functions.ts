export function casefold(s: string){
    return s.normalize('NFKC').toLowerCase();
}

export function MStoTime(ms: number, startFrom: number = 0){
    const scales = [1000, 60, 60, 24];
    let result = [];
    let currVal = Math.floor([ms, ...scales.slice(0, startFrom)].reduce((total, num)=>{
      return total / num;
    }));
    for(let i = startFrom; i < scales.length; i++){
      const currScale = currVal % scales[i];
      console.log(currVal, currScale);
      currVal = (currVal - currScale) / scales[i];
      result.unshift(currScale);
      if(currVal <= 0) break;
    }
    return result.join(':');
}