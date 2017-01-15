/**
 * Created by Klavdij on 29/12/2016.
 */
import './templates/mainBody.html';
import './templates/loginPage.html';
import './templates/dashboard.html';
import './templates/settings.html';
import './templates/modal.html';
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
                    username: $('input#username').val(),
                    profile_pic: null,
                    distance: true
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
                                FlowRouter.go('/success');
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
            $('#login-loader').removeClass('hidden');
            Meteor.loginWithPassword(user.email, user.password, function (err) {
                if (err) {
                    $('#login-loader').addClass('hidden');
                    $('.username_exists').css('visibility', 'visible');
                } else {
                    Meteor.call('updateMatches',Meteor.user(),(err,res) => {
                        if (err) {
                            console.log("Error updating matches");
                        } else {
                            $('#login-loader').addClass('hidden');
                            $('.username_exists').css('visibility', 'hidden');
                            FlowRouter.go('/user/dashboard');
                        }
                    })
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
            Meteor.subscribe('matches_data', Meteor.userId());
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
        draggable: true
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
        let mileageDaily = 0;
        _.each(matches, (match, index) => {
            revenue += match.match_price;
            let matchData = MatchesData.findOne({matchId:match._id});
            if (matchData) {
                mileageDaily += (matchData.mileage + matchData.dailyAmount)
            }
        });
        Session.set('mileageDaily', mileageDaily);
        Session.set('revenue', revenue);
        return revenue;
    },
    monthly: () => {
        return parseInt(Session.get('revenue') + Session.get('mileageDaily'));
    },
    mileageDaily: () => {
        return parseInt(Session.get('mileageDaily'));
    }
});

Template.settings_template.onRendered(() => {
    $("#settings").validate({
        rules: {
            password: {
                minlength: 5
            },
            password_repeat: {
                equalTo: "#password"
            }
        },
        messages: {
            password: {
                minlength: "Geslo mora biti dolgo vsaj 5 znakov"
            },
            password_repeat: {
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
            let user = {
                id: Meteor.userId(),
                password: $('input#password').val(),
                distance: $('input#distance').is(":checked")
            };

            Meteor.call('changeUserPassword', user, (err, res) => {
                if (err) {
                    console.log("Failed to change password");
                } else {
                    console.log("Successfully changed password.Redirecting");
                    FlowRouter.go('/user/success');
                }
            });
        }
    });
});

Template.settings_template.events({
    'submit form': (event) => {
        event.preventDefault();
    },

    'click .save-changes': (event, template) => {
        template.$('form:first').submit();
    }
});

Template.matches_row.events({
    "click .edit-match": (event, template) => {
        let modal = $("#edit_match_modal");
        let obj = $(event.currentTarget).data();

        Session.set("active_matchData", obj);

        modal.openModal();
    }
});

Template.matches_row.onRendered(() => {
    $('.tooltipped').tooltip({delay: 50});

    this.$('.edit-match').leanModal({
        complete: function () {
            Session.set("active_matchData", null);
        }
    });
});

Template.edit_match_modal.helpers({
    matchData: () => {
        let resp = Session.get('active_matchData');
        if (resp) {
            delete resp.position;
            delete resp.tooltip;
            delete resp.tooltipId;
            let editedMatchData = MatchesData.findOne({matchId:resp.id});
            return _.extend(resp,{editedData:editedMatchData});
        }
    },

    dailyValue: (amount,matchAmount) => {
        return amount === matchAmount;
    }
});

Template.edit_match_modal.events({
    "submit form": (event) => {
        event.preventDefault();
    },
    "click .save-match-data": (event, template) => {
        template.$('form:first').submit();
    }
});

Template.edit_match_modal.onRendered(() => {

    const self = this;

    this.$("form#match-data").validate({
        submitHandler: (event) => {

            let match = {
                user: Meteor.userId(),
                matchId: Session.get('active_matchData').id,
                comment: $('textarea#match_comment').val(),
                mileage: parseInt($('input#mileage').val()),
                dailyAmount: parseFloat($("input[name='group1']:checked").val())
            };

            Meteor.call("edit_matchData", match, function (err, res) {
                if (err) {
                    console.log("Error updating match");
                } else {
                    console.log(res);
                    self.$("#edit_match_modal").closeModal();
                    Session.set('active_matchData',null);
                    console.log("Successfully updated match");
                }
            });
        }
    });
});
