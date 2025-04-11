import { ThemeProvider } from "@/components/theme/theme-provider";
import "../styles/globals.css";
import { ChartsProvider } from "./context/charts-context";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChartsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ChartsProvider>
      </body>
    </html>
  );
}
