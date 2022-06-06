/*
    --> README.md
        ### Expected behaviour

        - First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
        - Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
        - A confirmation modal should pop up before a comment or reply is deleted.
        - Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
        - You can only edit or delete your own comments and replies.

    FIXED:
        - MAJOR: you can edit more containers at a time: eventsListener & handleEvent are involved. Switch event after 'click' triggered. @~245
            I fear, all btn event succes in the eventsListener could afflict this. Dig into class assigned.
            @eventsListener(e):@254,@361 filter out untriggered events ; 
                - 'editFlexBtnContainer' is added onClick;
        - (MAJOR issue: icsbuildsession.js doesn't draw up according to localStorage json data, you can verify it by refreshing page after
            you added 2-3 replies. Must investigate about: missing field "repliyingTo" (take advantage of this building HTML),
            in data.json, the triggering of drawUp passing 'reply' which appends 'juliusomo:id4:content:"I couldn't agree etc"' to 
            'this.container' HTML. (\\DESKTOP:\debugging_refresh_localStorage: something interferes with '.comment-reply-this'):
                - '.comment-reply-this' depends on event trigger;
                - bug comes from what icsbuildsession.js@170 triggers;
                - uncomment previous code and you will see JSON doesn't nest itself after '.comment-user-nested-grid-container';):
            --> fix: problem resided in the last if statement (filtering out '.comment-reply-this' which concerns event trigger) in 
                     'buildComment' method. The last statement 'else' fired on "target.querySelector(`.${crgClass}`).append(comment);": 
                      if you add replies mismatching 'localStorage' you'll get new 'comment-user-nested-grid-container', so 
                      "target.querySelector(`.${crgClass}`).append(comment);" will catch the first element it founds.
            )
        - \\DESKTOP:'ics_edit_response.jpg' screenshoot, css doesn't respect margins; // depends on 'implicit-grid' call
            --> fix: changed '.comment-edited-fb-button-container .edit-button' margin
        - MAJOR: js/icsbuildsession.js@208: catching edit target, take a look; edit success on localStorage event;
           --> start from 'icsbuildsession.js'@212, 'id' is not fuound about 'edit' case.
    TODO:
        - MAJOR: style doesn't change after you edit another 'edit-button' element. It depends on event trigger: debug @icsbuildession.js@309,331,364
        - handle createdAt by Date; get latest ID from jsonData; 
        - (appereance: https://jeth0214.github.io/FE-interactive-comments-section/);
    
*/

import {IcsStyle} from './icsstyle.js';
import {BuildSession} from './icsbuildsession.js';

function ics() {
    //document.addEventListener('DOMContentLoaded', () => localStorage.clear());

    let elClk = document.querySelectorAll('button'),
        evClk = ['mouseover', 'mouseout', 'mousedown', 'mouseup'],
        moderateBlue = 'hsl(238, 40%, 52%)',
        grayishBlue = 'hsl(211, 10%, 45%)',
        deepPink = 'hsl(328, 100%, 54%)',
        events = ['click', 'mouseout'];

    new IcsStyle(elClk, evClk, moderateBlue, grayishBlue, deepPink);
    new BuildSession('./data.json');
    
}

//window.addEventListener('DOMContentLoaded', () => localStorage.clear());
ics();