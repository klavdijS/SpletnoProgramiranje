/**
 * Created by Klavdij on 29/12/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';

Meteor.methods({
    userInsert: function (user) {
        var checkUser = Meteor.users.find({"profile.username":user.profile.username}).fetch();
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
        }
    },

    usernameExists: function(user) {
        let checkUser = Meteor.users.find({"username":user.profile.username}).fetch();
        let checkEmail = Accounts.findUserByEmail(user.email);
        return {
            username : checkUser.length > 0,
            email: !_.isUndefined(checkEmail)
        };
    }
});