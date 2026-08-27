import { Location } from "react-router-dom";

export const isActiveText = (
  route: string,
  location: Location
): "primary" | "secondary" => {
  const reg = location.pathname.match(/^\/[a-z]*/);
  if (reg) {
    return route === reg[0] ? "primary" : "secondary";
  } else {
    return route === location.pathname ? "primary" : "secondary";
  }
};
