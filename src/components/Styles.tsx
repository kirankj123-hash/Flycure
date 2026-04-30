'use client';

export function GlobalStyles() {
  return (
    <style jsx global>{`
      /* CSS Custom Properties for Design System */
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --primary: 173 100% 41%;
        --primary-foreground: 0 0% 100%;
        --secondary: 240 100% 63%;
        --secondary-foreground: 0 0% 100%;
        --muted: 210 40% 96%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --accent: 210 40% 96%;
        --accent-foreground: 222.2 84% 4.9%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --ring: 173 100% 41%;
        --radius: 0.5rem;
      }
      
      /* Global font settings */
      * {
        font-feature-settings: "rlig" 1, "calt" 1;
      }
      
      body {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        font-weight: 400;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        font-weight: 600;
        line-height: 1.4;
      }
    `}</style>
  );
}