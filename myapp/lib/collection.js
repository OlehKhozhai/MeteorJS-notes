import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

Meteor.methods({
  'modal.insert'(text) {
    check(text, String);

    Notes.insert({
      text,
      createAt: new Date(),
      userName: Meteor.user().username,
      owner: Meteor.userId()
    })
  },
  'note.remove'(note){
    check(note._id, String)
    if(note.owner != Meteor.userId()){
      throw Meteor.Error()
    }
    Notes.remove(note._id);
  }
})


export const Notes = new Mongo.Collection('notes'); 
