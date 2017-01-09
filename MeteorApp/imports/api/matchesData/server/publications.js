/**
 * Created by Klavdij on 09/01/2017.
 */
// imports
import { Meteor } from 'meteor/meteor';
import { MatchesData } from '../matchesData.js';

Meteor.publish('matches_data', function(){
    return MatchesData.find({});
});