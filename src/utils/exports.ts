import formatStr from "./formatStr";
import getAllFiles from "./getAllFiles";
import filterObj from "./filterObj";
import looselyCheck from "./looselyCheckCmds";
import runSafe from "./runSafe";
import { log, warn, error, info, success } from "./logs";
import parseTimeToMs from "./parseTimeToMs";
import resolveCommandJSON from "./resolveCommandJSON";
import guildCheck from "./guildCheck";
import handleNoCode from "./handleNoCode";
import handleGuildCheck from "./handleGuildCheck";

export const logger = { log, warn, error, info, success };

const util = {
  formatStr,
  getAllFiles,
  filterObj,
  looselyCheck,
  runSafe,
  parseTimeToMs,
  resolveCommandJSON,
  guildCheck,
  handleNoCode,
  handleGuildCheck,
};

export default util;
