import { useEffect, useState, type JSX } from "react";
import { ThemeContext } from "./theme-context";
import type { Theme } from "./theme-context-type";

export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const [theme, setTheme] = useState<Theme>("dark");

	const toggleTheme = (): void => setTheme((theme) => (theme === "light" ? "dark" : "light"));

	useEffect((): void => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
