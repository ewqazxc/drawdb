import { useLayoutEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Spin } from "@douyinfe/semi-ui";
import { useSettings } from "../hooks";
import { routeConfig } from "./routeConfig";

export default function IRouters() {
  return (
    <BrowserRouter>
      <RestoreScroll />
      <Routes>
        {routeConfig.map((route) => {
          const element = (
            <Suspense fallback={<Spin />}>
              {route.useThemedPage ? (
                <ThemedPage>
                  <route.component />
                </ThemedPage>
              ) : (
                <route.component />
              )}
            </Suspense>
          );
          return <Route key={route.path} path={route.path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

function ThemedPage({ children }) {
  const { setSettings } = useSettings();

  useLayoutEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setSettings((prev) => ({ ...prev, mode: "dark" }));
      const body = document.body;
      if (body.hasAttribute("theme-mode")) {
        body.setAttribute("theme-mode", "dark");
      }
    } else {
      setSettings((prev) => ({ ...prev, mode: "light" }));
      const body = document.body;
      if (body.hasAttribute("theme-mode")) {
        body.setAttribute("theme-mode", "light");
      }
    }
  }, [setSettings]);

  return children;
}

function RestoreScroll() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);
  return null;
}
