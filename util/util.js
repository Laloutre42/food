/**
 * Created by A548707 on 25/08/2014.
 */

module.exports.handleError = function (err, res) {
    console.log(err);
    res.json({'error': 'An error has occurred'});
};