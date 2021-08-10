export function truncateThisString(str: string): string {
    const length=180
    if(str.length>length){
        return str.substring(0,length)+'...';
    }
    return str
}
