const moment = require('moment');

var messageDate = '2018-11-06 01:15:00';

var diff = moment(messageDate).fromNow();
console.log(diff);
