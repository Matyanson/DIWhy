import ColorTemplate from '../models/ColorTemplate';

const themes: { [key: string]: ColorTemplate } = {
    light: {
        dark: "#070d59",
        text: "#343a40",
        heading: "#1f3c88",
        primary: "#ee6f57",
        primary_light: "#ff7e66",
        neutral: "#eaeaea",
        neutral_dark: "#cccccc",
        background: "#f6f5f5",
        allert:"#ee6f57"
    },
    test: {
        dark: "#2d3550",
        text: "#2d3550",
        heading: "#2d3550",
        primary: "#3e65cf",
        primary_light: "#4f7af0",
        neutral: "#fff",
        neutral_dark: "#bdc8d9",
        background: "#f3f1f7",
        allert: "#ff3730"
    },
    dark: {
        dark: "#99aab5",
        text: "#ffffff",
        heading: "#ffffff",
        primary: "#7289da",
        primary_light: "#36393f",
        neutral: "#23272a",
        neutral_dark: "#2c2f33",
        background: "#36393f",
        allert: "#ff8936"
    },
    dark2: {
        dark: "#404040",
        text: "#d9d9d9",
        heading: "#d9d9d9",
        primary: "#ed2553",
        primary_light: "#ed2553",
        neutral: "#1f1f1f",
        neutral_dark: "#404040",
        background: "#0d0d0d",
        allert: "#ff3730"
    },
    dark3: {
        dark: "#363636",
        text: "#c6c6c6",
        heading: "#fff",
        primary: "#f90",
        primary_light: "#f90",
        neutral: "#1b1b1b",
        neutral_dark: "#363636",
        background: "#000",
        allert: "#ff3730"
    },
}
export default themes;