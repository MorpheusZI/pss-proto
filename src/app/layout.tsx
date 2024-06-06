import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import '@mantine/nprogress/styles.css';

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress, nprogress } from "@mantine/nprogress"

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "Proto-PSS",
  description: "PSS Prototype",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const PSSTheme = createTheme({
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Cousine, monospace",
  headings: { fontFamily: 'Poppins, sans-serif' },
  black: "#090909",
  white: "#FFF"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"} />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <TRPCReactProvider>
          <MantineProvider theme={PSSTheme}>
            <NavigationProgress />
            <Notifications />
            {children}
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
