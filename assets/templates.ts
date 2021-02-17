import ColorTemplate from '../models/ColorTemplate';

const themes: { [key: string]: ColorTemplate } = {
    light: {
        nav_BG: "#070d59",
        nav_FG: "#f6f5f5",
        text: "#343a40",
        secondary: "#1f3c88",
        primary: "#ee6f57",
        neutral: "#eaeaea",
        neutral_dark: "#cccccc",
        background: "#f6f5f5",
        allert:"#ee6f57"
    },
    test: {
        nav_BG: "#2d3550",
        nav_FG: "#f3f1f7",
        text: "#2d3550",
        secondary: "#2d3550",
        primary: "#3e65cf",
        neutral: "#fff",
        neutral_dark: "#bdc8d9",
        background: "#f3f1f7",
        allert: "#ff3730"
    },
    dark: {
        nav_BG: "#99aab5",
        nav_FG: "#36393f",
        text: "#ffffff",
        secondary: "#ffffff",
        primary: "#7289da",
        neutral: "#23272a",
        neutral_dark: "#2c2f33",
        background: "#36393f",
        allert: "#ff8936"
    },
    dark2: {
        nav_BG: "#404040",
        nav_FG: "#d9d9d9",
        text: "#d9d9d9",
        secondary: "#d9d9d9",
        primary: "#ed2553",
        neutral: "#1f1f1f",
        neutral_dark: "#404040",
        background: "#0d0d0d",
        allert: "#ff3730"
    },
    dark3: {
        nav_BG: "#474747",
        nav_FG: "#c6c6c6",
        text: "#c6c6c6",
        secondary: "#fff",
        primary: "#f90",
        neutral: "#1b1b1b",
        neutral_dark: "#363636",
        background: "#000",
        allert: "#ff3730"
    },
}
export default themes;