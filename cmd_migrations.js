const { exec } = require('shelljs');

const scripts = {
    "migration-create": arg => `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create -n ${arg}`,
    "migration-gen": arg => `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -n ${arg}`,
    "migration-revert": _ => "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert",
    "migration-run": _ => "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run"
};

const [action, arg] = process.argv.slice(2);
const method = scripts[action];

!!method && exec(method(arg));