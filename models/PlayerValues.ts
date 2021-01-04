export default interface PlayerValues{
    currentMS: number,
    setMS: number,
    durationMS: number,
    paused: boolean,
    speed: number,
    trimStart?: number|null,
    trimEnd?: number|null
}