/**
 * Created by Klavdij on 29/12/2016.
 */
import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';
import {AccountsTemplates} from 'meteor/useraccounts:core';

let public = FlowRouter.group
FlowRouter.route('/', {
    name: "login",
    action: (params, queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: null,
            content: "login",
            footer: null
        });
    }
});

FlowRouter.route('/registration', {
    name: "registration",
    action: (params, queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: null,
            content: "registration",
            footer: null
        });
    }
});

FlowRouter.route('/login', {
    name: "login",
    action: (params, queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: null,
            content: "content_login",
            footer: null
        });
    }
});

FlowRouter.route('/success', {
    name: "success",
    action: (params, queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: null,
            content: "success_registration",
            footer: null
        });
        setTimeout(() => {
            FlowRouter.go('/');
        }, 4000);
    }
});

let signedIn = FlowRouter.group({
    name: "user",
    prefix: "/user",
    triggersEnter: [
        function (context, redirect) {
            if (!Meteor.userId()) {
                redirect('/');
            }
        }
    ]
});

signedIn.route('/dashboard', {
    name: "dashboard",
    action: (params, queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: "dashboard_header_submenu",
            content: "dashboard_main_content",
            footer: "dashboard_footer"
        });
    }
});

signedIn.route('/settings', {
    name: "settings",
    action: (params,queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: "settings_header_submenu",
            content: "settings_template",
            footer: null
        })
    }
});

signedIn.route('/success',{
   name: "success",
    action: (params,queryParams) => {
        BlazeLayout.render('mainBody', {
            subMenu: "settings_header_submenu",
            content: "settings_success",
            footer: null
        });
        setTimeout(() => {
            FlowRouter.go('/user/dashboard');
        }, 2000);
    }
});