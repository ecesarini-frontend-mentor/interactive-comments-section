/*
    --> README.md
        ### Expected behaviour

        - First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
        - Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
        - A confirmation modal should pop up before a comment or reply is deleted.
        - Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
        - You can only edit or delete your own comments and replies.

    FIXED:
        MAJOR:
            - fire mediaquery on page load or event, lot of mess. Try to trigger 'load' event in 'ics.js'. // Create div element inside rearrangeCommentContainer's foreEach loop.

    TODO:
        MAJOR:
            - Edit events in mobile design. Match tail-container with desktop case confirm-undo events: error@icsbuildession.js@338.
            
        - Adjust css for responsive design:
            - Margins of 'comment-user-tail-container-actions';
            - Comment line across replies;
        - get into mobile desing: new class added 'icsmq' to handle JS and CSS relating.
        - (@function elementsPropertiesRemover: 
            * make 'attributeTarget' argument handleable to catch eventual attributes;
        )
        - (appereance: https://jeth0214.github.io/FE-interactive-comments-section/);
    
*/

import { IcsStyle } from './icsstyle.js';
import { BuildSession } from './icsbuildsession.js';


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
    /*document.addEventListener('load', () => {
        if(this.mediaQuery.matches) rearrangeCommentContainer();
    });*/
}

//window.addEventListener('DOMContentLoaded', () => localStorage.clear());
ics();