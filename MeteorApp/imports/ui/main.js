/**
 * Created by Klavdij on 29/12/2016.
 */
import './templates/mainBody.html';
import './templates/loginPage.html';
import './templates/dashboard.html';

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
            Meteor.call('usernameExists', user, (err,res) => {
                if (err) {
                    console.log(err)
                } else {
                    if (res.username === true && res.email === true) {
                        $('.username_exists').css('visibility','visible').text('Uporabniško ime že obstaja! Račun s tem emailom že obstaja!');
                    } else if (res.username === true && res.email === false) {
                        $('.username_exists').css('visibility','visible').text('Uporabniško ime že obstaja!');
                    } else if (res.username === false && res.email === true) {
                        $('.username_exists').css('visibility','visible').text('Račun s tem emailom že obstaja!');
                    } else if (res.username === false && res.email === false) {
                        $('.username_exists').css('visibility','hidden');
                        Meteor.call('userInsert',user,(err,res) => {
                           if (err) {
                               console.log("User not created. Error: ",err);
                           }  else {
                               console.log("User created. Response: ",res);
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

Template.login.onRendered(()=>{
    $('#login').validate({
        rules: {
            username: {
                required:true
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
            Meteor.loginWithPassword(user.email,user.password,function(err){
                if (err) {
                    $('.username_exists').css('visibility','visible');
                } else {
                    $('.username_exists').css('visibility','hidden');
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

    'click .login-btn': (event,template) => {
        template.$('form:first').submit();
    }
});
/*
 Template.content.events({
 'submit form': function (event) {
 event.preventDefault();
 var user = {
 email : $('[name=email]').val(),
 password : $('[name=password]').val()
 };
 Meteor.call('userInsert',user,function(err,res){
 if (err) {
 console.log(err);
 } else {
 FlowRouter.go('home');
 console.log("No error, logged in bič");
 }
 });
 }
 });

 Template.home_content.events({
 'click .logout': function(event,template) {
 event.preventDefault();
 Meteor.logout();
 FlowRouter.go('/');
 }
 });

 Template.home_content.helpers({
 currentUser: function() {
 return Meteor.user();
 }
 });

 Template.content_login.events({
 'submit form': function (event) {
 event.preventDefault();
 var email = $('[name=email]').val();
 var password = $('[name=password]').val();
 console.log("Logging in");
 Meteor.loginWithPassword(email,password,function (err) {
 if (err) {
 console.log(err)
 } else {
 console.log("Logged in");
 FlowRouter.go('home');
 }
 });
 }
 });*/
