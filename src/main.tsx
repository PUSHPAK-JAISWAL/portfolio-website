import { createRoot } from "react-dom/client";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import App from "./App.tsx";
import "./index.css";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
