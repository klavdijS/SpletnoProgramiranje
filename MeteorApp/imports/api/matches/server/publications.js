/**
 * Created by Klavdij on 08/01/2017.
 */

// imports
import { Meteor } from 'meteor/meteor';
import { Matches } from '../matches.js';

Meteor.publish('matches', function(user){
    let referee = user.profile.name+" "+user.profile.surname;
    return Matches.find({referees:referee});
});