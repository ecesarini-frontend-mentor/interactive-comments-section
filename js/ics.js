/*
    --> README.md
        ### Expected behaviour

        - First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
        - Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
        - A confirmation modal should pop up before a comment or reply is deleted.
        - Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
        - You can only edit or delete your own comments and replies.

    FIXED:
        - 'delete' and 'edit' actions don't work clicking on new added element: example@\\Desktop:/ics_debug_target_on_Click_new_element_created.jpg (added this.eventsListener() after element building);
        - removed .comment-edited-fb-button-container if you click delete without undo edit event
        - updated css to center modal in fixed position
        - deletion of comment (not reply) from localStorage 

    TODO:
        MAJOR:
            - score handling: 
                added 'score' method to icsbuildsession.js class --> find a way to update localStorage on event (maybe by 'eventsStoreDelete()' method?)?
                - related: sorting replies;
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
    
}

//window.addEventListener('DOMContentLoaded', () => localStorage.clear());
ics();