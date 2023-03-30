"use client";
import { ThemeProvider } from "next-themes";
import { useSession, SessionProvider } from "next-auth/react"

export default function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
        <ThemeProvider enableSystem={true} attribute="class">
        <div className="dark:bg-gray-700 dark:text-gray-200 text-gray-700 transition-colors duration-300 min-h-screen select-none">
            {children}
        </div>
        </ThemeProvider>
    </SessionProvider>
 
  );
}
