import formatStr from "./formatStr";
import getAllFiles from "./getAllFiles";
import filterObj from "./filterObj";
import looselyCheck from "./looselyCheckCmds";
import runSafe from "./runSafe";
import { log, warn, error, info, success } from "./logs";
import delay from "./delay";
import parseTimeToMs from "./parseTimeToMs";
import resolveCommandJSON from "./resolveCommandJSON";

export const logger = { log, warn, error, info, success };

const util = {
  formatStr,
  getAllFiles,
  filterObj,
  looselyCheck,
  runSafe,
  delay,
  parseTimeToMs,
  resolveCommandJSON,
};

export default util;
