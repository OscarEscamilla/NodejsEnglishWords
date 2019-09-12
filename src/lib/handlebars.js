const { format } = require('timeago.js');

const helpers = { };



helpers.time_ago = (timestamp) =>{
    return format(timestamp);
}


module.exports = helpers;