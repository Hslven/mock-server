/**
 * Represents the files obtained from the context.
 * @type {Object}
 */
const fs = require('fs');
const path = require('path');
const mockList = [];
fs.readdirSync(path.resolve(__dirname, './primary')).forEach(file => {
    if (file === 'index.js') return;
    mockList.push(require(path.resolve(__dirname, './primary', file)))

});
module.exports = mockList;