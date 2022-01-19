const requireEsm = require('esm')(module /* , options */);

requireEsm('../src/cli').default(process.argv);
