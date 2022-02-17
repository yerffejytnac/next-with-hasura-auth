import common from "./colors/common";
import blue from "./colors/blue";
import cyan from "./colors/cyan";
import fuschia from "./colors/fuschia";
import gray from "./colors/gray";
import green from "./colors/green";
import indigo from "./colors/indigo";
import lime from "./colors/lime";
import orange from "./colors/orange";
import pink from "./colors/pink";
import red from "./colors/red";
import teal from "./colors/teal";
import yellow from "./colors/yellow";
import violet from "./colors/violet";

const colors = {
  ...common,
  blue: Object.assign(blue[500], blue),
  cyan: Object.assign(cyan[500], cyan),
  fuschia: Object.assign(fuschia[500], fuschia),
  gray: Object.assign(gray[500], gray),
  green: Object.assign(green[500], green),
  indigo: Object.assign(indigo[500], indigo),
  lime: Object.assign(lime[500], lime),
  orange: Object.assign(orange[500], orange),
  pink: Object.assign(pink[500], pink),
  red: Object.assign(red[500], red),
  teal: Object.assign(teal[500], teal),
  yellow: Object.assign(yellow[500], yellow),
  violet: Object.assign(violet[500], violet),
};

export default colors;
