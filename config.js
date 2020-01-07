const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '-----',
  hash: 'hash-one',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: []
};

const REDIS_HOST = "redis-12258.c114.us-east-1-4.ec2.cloud.redislabs.com";
const REDIS_PORT = "12258";
const REDIS_PASSWORD = "cPwVSSGBSawHORbmgWFz0fP0o21aFltS";

// const MINING_REWARD = 50;

module.exports = {
  GENESIS_DATA,
  MINE_RATE,
  // STARTING_BALANCE,
  // REWARD_INPUT,
  // MINING_REWARD
};
