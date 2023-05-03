import React from "react";

import { formatingNumber } from "../../helpers";

export default function PriceFormat(props) {
  return <b style={{ color: "green" }}>{formatingNumber(props.num)}</b>;
}
