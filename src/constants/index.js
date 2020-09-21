// I only want my Dynamo table using 5 Read/Write capacity units
// A capacity unit can be thought of as a 1K write/read per second
const PROVISIONED_CAPACITY_UNITS = 5;

// Making this slightly over a second to give myself some
// buffer to not be right at the line of 5 capacity units
const SINGLE_CAPACITY_UNIT_USED_TIME_MS = 1200;

export { PROVISIONED_CAPACITY_UNITS, SINGLE_CAPACITY_UNIT_USED_TIME_MS };
