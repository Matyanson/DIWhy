import ColorTemplate from '../models/ColorTemplate';

const themes: { [key: string]: ColorTemplate } = {
    light: {
        dark: "#070d59",
        text: "#343a40",
        heading: "#1f3c88",
        primary: "#ee6f57",
        container: "#eaeaea",
        background: "#f6f5f5",
        allert:"#ee6f57"
    },
    dark: {
        dark: "#47879c",
        text: "#def",
        heading: "#7effae",
        primary: "#fcdab7",
        container: "#133b5c",
        background: "#1d2d50",
        allert: "#ff8936"
    }
}
export default themes;