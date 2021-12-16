export default [
  {
    path: "",
    name: "home",
    component: () => import("../views/Home"),
  },
  {
    path: "login",
    name: "login",
    component: () => import("../views/Login"),
  },
];
