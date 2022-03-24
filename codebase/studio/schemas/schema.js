import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import { userSchema } from "./userSchema";
import { tripSchema } from "./tripSchema";
import { ridesSchema } from "./ridesSchema";
export default createSchema({
  // We name our schema
  name: "default",

  types: schemaTypes.concat([userSchema, tripSchema, ridesSchema]),
});
