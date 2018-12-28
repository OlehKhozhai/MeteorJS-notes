import { Template } from 'meteor/templating';
import {Notes}  from '../lib/collection.js';
import './main.html';
require('materialize-css');
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

$(document).ready(function () {
  $('.modal').modal();
});

Template.body.helpers({
  notes(){
    return Notes.find({}); 
  }
});

Template.modal.events({
  'submit .form-add-note': function(){
    event.preventDefault();
    let target = event.target;
    let text = target.input.value;

    Meteor.call('modal.insert', text)
    target.input.value = '';
    $('.modal').modal('close');
    return false;
  }
});

Template.note.events({
  'click .delete-note': function(){
    Meteor.call('note.remove', this)
    return false;
  }
})
