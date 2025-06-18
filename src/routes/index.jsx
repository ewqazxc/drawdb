import { useLayoutEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Spin } from "@douyinfe/semi-ui";
import { routeConfig } from "./routeConfig";

export default function IRouters() {
  return (
    <BrowserRouter>
      <RestoreScroll />
      <Routes>
        {routeConfig.map((route) => {
          const element = (
            <Suspense fallback={<Spin />}>
              <route.component />
            </Suspense>
          );
          return <Route key={route.path} path={route.path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

function RestoreScroll() {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);
  return null;
}
