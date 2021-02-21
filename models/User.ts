import ColorTemplate from "./ColorTemplate";

export default interface User{
    currTheme?: ColorTemplate,
    email: string,
    img: string,
    username: string
}