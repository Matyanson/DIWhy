import IStep from './Step';

export default interface Video {
    title: string,
    public: boolean,
    author: { username: string, userId: string },
    url: string,
    tools: string[],
    material: string[],
    steps: IStep[]
}