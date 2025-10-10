import PropTypes from "prop-types";
import React from "react";

import { useAppSelector } from "flavours/glitch/store";

const ThemeComponent = ({ children }) => {
  const theme = useAppSelector(
    (state) => state.getIn(["local_settings", "theme"]) ?? "mastodon-light",
  );

  let href;
  switch (true) {
    case theme === "mastodon":
      href = "";
      break;
    case theme === "mastodon-light":
      href = "/packs/css/skins/glitch/mastodon-light/common.css";
      break;
    case theme === "contrast":
      href = "/packs/css/skins/glitch/contrast/common.css";
      break;
  }

  return (
    <>
      {href !== "" ? <link rel='stylesheet' media='all' href={href} /> : null}
      {children}
    </>
  );
};

ThemeComponent.propTypes = {
  children: PropTypes.node,
};

export { ThemeComponent };
