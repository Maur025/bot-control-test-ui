import { useContext } from "react";
import { ThemeContext } from "./theme-context";
import type { ThemeContextType } from "./theme-context-type";

export const useTheme = (): ThemeContextType => {
	const context = useContext<ThemeContextType | undefined>(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be use within a ThemeProvider.");
	}

	return context;
};
