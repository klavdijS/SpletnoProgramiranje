/**
 * Created by Klavdij on 29/12/2016.
 */
import './templates/mainBody.html';
import './templates/loginPage.html';
import './templates/dashboard.html';
import './templates/settings.html';
import {Constants} from '../../lib/constants.js';
import {Matches} from '../../imports/api/matches/matches.js';
import {MatchesData} from '../../imports/api/matchesData/matchesData.js';
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

Template.registration.onRendered(() => {
    $("#registration").validate({
        rules: {
            name: {
                required: true,
            },
            surname: {
                required: true,
            },
            username: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            password_repeat: {
                required: true,
                equalTo: "#password"
            }
        },
        messages: {
            name: {
                required: "Vpišite ime"
            },
            surname: {
                required: "Vpišite priimek"
            },
            username: {
                required: "Vpišite uporabniško ime",
                minlength: "Uporabniško ime mora biti dolgo vsaj 5 znakov"
            },
            email: {
                required: "Vpišite email",
                email: "Vpišite veljavni email"
            },
            password: {
                required: "Vpišite geslo",
                minlength: "Geslo mora biti dolgo vsaj 5 znakov"
            },
            password_repeat: {
                required: "Ponovno vpišite geslo",
                equalTo: "Gesli se ne ujemata!"
            }

        },
        errorElement: 'div',
        errorClass: 'invalid',
        errorPlacement: (error, element) => {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: (form) => {
            var user = {
                email: $('input#email').val(),
                password: $('input#password').val(),
                profile: {
                    name: $('input#name').val().replace(/\b\w/g, l => l.toUpperCase()),
                    surname: $('input#surname').val().replace(/\b\w/g, l => l.toUpperCase()),
                    username: $('input#username').val()
                }
            };
            Meteor.call('usernameExists', user, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    if (res.username === true && res.email === true) {
                        $('.username_exists').css('visibility', 'visible').text('Uporabniško ime že obstaja! Račun s tem emailom že obstaja!');
                    } else if (res.username === true && res.email === false) {
                        $('.username_exists').css('visibility', 'visible').text('Uporabniško ime že obstaja!');
                    } else if (res.username === false && res.email === true) {
                        $('.username_exists').css('visibility', 'visible').text('Račun s tem emailom že obstaja!');
                    } else if (res.username === false && res.email === false) {
                        $('.username_exists').css('visibility', 'hidden');
                        Meteor.call('userInsert', user, (err, res) => {
                            if (err) {
                                console.log("User not created. Error: ", err);
                            } else {
                                console.log("User created. Response: ", res);
                                FlowRouter.go('success');
                            }
                        });
                    }
                }
            });
        }
    });
});


Template.registration.events({
    'submit form': (event, template) => {
        event.preventDefault();
    },
    'click .delete-data': (event, template) => {
        template.$('form:first')[0].reset();
    }
});

Template.login.onRendered(() => {
    $('#login').validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: "Vpišite uporabniško ime ali email"
            },
            password: {
                required: "Vpišite geslo"
            }
        },
        errorElement: 'div',
        errorClass: 'invalid',
        errorPlacement: (error, element) => {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: (form) => {
            let user = {
                email: $('input#username').val(),
                password: $('input#password').val()
            };
            Meteor.loginWithPassword(user.email, user.password, function (err) {
                if (err) {
                    $('.username_exists').css('visibility', 'visible');
                } else {
                    $('.username_exists').css('visibility', 'hidden');
                    FlowRouter.go('/user/dashboard');
                }
            });
        }
    });
});

Template.login.events({
    'submit form': (event) => {
        event.preventDefault();
    },

    'click .login-btn': (event, template) => {
        template.$('form:first').submit();
    }
});

Template.dashboard_main_content.onCreated(() => {
    Tracker.autorun(() => {
        if (Meteor.user()) {
            let date = new Date();
            Meteor.subscribe('matches', Meteor.user());
            Session.set('selected_year', date.getFullYear());
            Session.set('selected_month', date.getMonth());
        }
    });
});

Template.dashboard_header_submenu.onRendered(() => {
    let tmpl = Template.instance();

    tmpl.$('select').material_select();
});

Template.slide_out_menu.onRendered(() => {
    let tmpl = Template.instance();

    tmpl.$('.button-collapse').sideNav({
        menuWidth: 300,
        draggable: true,
        closeOnClick:true
    });
});

Template.slide_out_menu.helpers({
    nameAndSurname: () => {
        let user = Meteor.user();
        if (user) {
            return user.profile.name + " " + user.profile.surname;
        }
    },
    copyright: () => {
        return Constants.COPYRIGHT;
    }
});

Template.slide_out_menu.events({
    'click .logout': (event, template) => {
        Meteor.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                FlowRouter.go('/');
            }
        });
    }
});

Template.dashboard_header_submenu.helpers({
    checkMonth: (month) => {
        return new Date().getMonth() === month;
    }
});

Template.dashboard_header_submenu.events({
    "change #season": (event) => {
        let newValue = parseInt($(event.target).val());
        let oldValue = Session.get('selected_year');
        if (newValue != oldValue) {
            Session.set('selected_year', newValue);
        }
    },
    "change #month": (event) => {
        let newValue = parseInt($(event.target).val());
        let oldValue = Session.get('selected_month');
        if (newValue != oldValue) {
            Session.set('selected_month', newValue);
        }
    }
});

Template.dashboard_main_content.helpers({
    matches: () => {
        let year = Session.get('selected_year');
        let month = Session.get('selected_month');
        if (!(_.isUndefined(year)) && !(_.isUndefined(month))) {
            let nextMonth = month;
            let nextYear = year;
            if (month === 11) {
                nextMonth = 0;
                nextYear += 1;
            } else {
                nextMonth += 1;
            }
            let lowerTs = new Date(year, month, 1, 0).getTime() / 1000;
            let higherTs = new Date(nextYear, nextMonth, 1, 0).getTime() / 1000;
            let matches = Matches.find({
                timestamp: {
                    $gte: lowerTs,
                    $lt: higherTs
                }
            }).fetch();
            Session.set('current_matches', matches);
            return matches;
        }
    }
});

Template.dashboard_footer.helpers({
    revenue: () => {
        let matches = Session.get('current_matches');
        let revenue = 0;
        _.each(matches, (match, index) => {
            revenue += match.match_price;
        });
        Session.set('revenue', revenue);
        return revenue;
    },
    monthly: () => {
        return Session.get('revenue') + 20;
    }
});
