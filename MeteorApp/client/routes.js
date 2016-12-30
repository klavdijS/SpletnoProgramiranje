/**
 * Created by Klavdij on 29/12/2016.
 */
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

let public = FlowRouter.group
FlowRouter.route('/', {
    name: "login",
    action: (params, queryParams) => {
        BlazeLayout.render('mainBody', {
            mainMenu: "mainMenu",
            subMenu: null,
            content:"login",
            footer: null
        });
    }
});

FlowRouter.route('/registration', {
    name:"registration",
    action: (params,queryParams) => {
        BlazeLayout.render('mainBody', {
            mainMenu: "mainMenu",
            subMenu: null,
            content:"registration",
            footer: null
        });
    }
});

FlowRouter.route('/login', {
    name:"login",
    action: (params,queryParams) => {
        BlazeLayout.render('mainBody', {
            mainMenu: "mainMenu",
            subMenu: null,
            content:"content_login",
            footer: null
        });
    }
});

FlowRouter.route('/success', {
    name:"success",
    action: (params,queryParams) => {
        BlazeLayout.render('mainBody', {
            mainMenu: "mainMenu",
            subMenu: null,
            content:"success_registration",
            footer: null
        });
        setTimeout(()=>{
            FlowRouter.go('/');
        },4000);
    }
});

let signedIn = FlowRouter.group({
    name:"user",
    prefix:"/user",
    triggersEnter: [
        function(context,redirect) {
            if (!Meteor.userId()) {
                redirect('/');
            }
        }
    ]
});

signedIn.route('/dashboard',{
   name:"dashboard",
    action: (params,queryParams) => {
        BlazeLayout.render('mainBody', {
            mainMenu: "mainMenu",
            subMenu: null,
            content:"dashboard",
            footer: null
        });
    }
});