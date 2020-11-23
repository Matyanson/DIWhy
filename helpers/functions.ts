export function casefold(s: string){
    return s.normalize('NFKC').toLowerCase();
}