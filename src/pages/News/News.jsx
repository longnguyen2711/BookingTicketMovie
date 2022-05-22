import React from "react";
import { LINK_BACKGROUND_HOMEPAGE } from "../../util/settings/config";

export default function News(props) {
  return (
    <div
      className="pb-96"
      style={{
        backgroundImage: `url(${LINK_BACKGROUND_HOMEPAGE})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      News
    </div>
  );
}
