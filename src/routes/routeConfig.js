import { lazy } from "react";
import Editor from "../pages/Editor";

export const routeConfig = [
  {
    path: "/",
    component: lazy(() => import("../pages/LandingPage")),
  },
  {
    path: "/editor",
    component: Editor,
    // component: lazy(() => import("../pages/Editor")),// 懒加载会影响 tailwindcss 样式权重，暂不使用
    useThemedPage: true,
  },
  {
    path: "/survey",
    component: lazy(() => import("../pages/Survey")),
    useThemedPage: true,
  },
  {
    path: "/bug-report",
    component: lazy(() => import("../pages/BugReport")),
    useThemedPage: true,
  },
  {
    path: "/templates",
    component: lazy(() => import("../pages/Templates")),
  },
  {
    path: "*",
    component: lazy(() => import("../pages/NotFound")),
  },
];