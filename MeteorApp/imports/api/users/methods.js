/**
 * Created by Klavdij on 29/12/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Helper} from '../../startup/server/helpers.js';
import {Constants} from '../../../lib/constants.js';
import { HTTP } from 'meteor/http';

var apiCall = function (apiUrl, callback) {
    // try…catch allows you to handle errors
    try {
        console.log(apiUrl);
        var response = HTTP.get(apiUrl).data;
        // A successful API call returns no error
        // but the contents from the JSON response
        callback(null, response);
    } catch (error) {
        // If the API responded with an error message and a payload
        if (error.response && error.response.data) {
            var errorCode = error.response.data.code;
            var errorMessage = error.response.data.message;
            // Otherwise use a generic error message
        } else {
            var errorCode = 500;
            var errorMessage = 'Cannot access the API';
        }
        // Create an Error object and return it via callback
        var myError = new Meteor.Error(errorCode, errorMessage);
        callback(myError, []);
    }
};

Meteor.methods({
    userInsert: function (user) {
        var checkUser = Meteor.users.find({"profile.username": user.profile.username}).fetch();
        if (checkUser.length > 0) {
            throw new Meteor.Error(500, 'Error 500: User already exists', 'The user already exists');
        } else {

            Accounts.createUser({
                email: user.email,
                password: user.password,
                username: user.profile.username,
                profile: {
                    name: user.profile.name,
                    surname: user.profile.surname,
                }
            });

            this.unblock();

            let requestUrl = Constants.API_URL_GET_MATCHES_REFEREE + Helper.prepareUrl(user.profile.name, user.profile.surname);

            let response = Meteor.wrapAsync(apiCall)(requestUrl);

            Helper.insertMatchesIntoDB(response);
        }
    },

    usernameExists: function (user) {
        let checkUser = Meteor.users.find({"username": user.profile.username}).fetch();
        let checkEmail = Accounts.findUserByEmail(user.email);
        return {
            username: checkUser.length > 0,
            email: !_.isUndefined(checkEmail)
        };
    }
});