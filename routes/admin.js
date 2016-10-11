/**
 * Created by navina on 11/10/16.
 */
// GET login page
exports.login = function (req, res) {
    res.render('login-page', {title: 'Log in'})
};