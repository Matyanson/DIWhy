import IStep from './Step';

export default interface Video {
    title: string,
    casefold?: string,
    public: boolean,
    timestamp?: number,
    author?: { username: string, userId: string },
    url: string,
    tools: string[],
    material: string[],
    steps?: IStep[]
}