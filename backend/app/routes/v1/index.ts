import usersRoute from "./users/route";
import whitelistsRoute from "./whitelists/route";
import { IRoutes, IRoute } from "../../types";

const routes: IRoutes = [
  {
    url: "users",
    route: usersRoute,
  },
  {
    url: "whitelists",
    route: whitelistsRoute,
  },
];

export default routes.map((e: IRoute) => {
  e.url = `v1/${e.url}`;
  return e;
});
