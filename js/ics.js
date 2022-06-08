/*
    --> README.md
        ### Expected behaviour

        - First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
        - Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
        - A confirmation modal should pop up before a comment or reply is deleted.
        - Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
        - You can only edit or delete your own comments and replies.

    FIXED:
        - MAJOR: style doesn't change after you edit another 'edit-button' element. It depends on event trigger: debug @icsbuildession.js@309,331,364 
          (fixed @function elementsPropertiesRemover);
        - (@function elementsPropertiesRemover: 
            DIG INTO: 
             * WHY THIS FUNCTION DISCRIMINATES 'forEach' and 'map'? Read explaination in the comments of the function.
            )
    TODO:
        - (@function elementsPropertiesRemover: 
             * make 'attributeTarget' argument handleable to catch eventual attributes;
            )
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