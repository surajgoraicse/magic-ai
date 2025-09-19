import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./popup/App.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<App />
			<Toaster />
		</ThemeProvider>
	</StrictMode>
);
