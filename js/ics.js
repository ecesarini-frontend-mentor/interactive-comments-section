/*
    --> README.md
        ### Expected behaviour

        - First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
        - Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
        - A confirmation modal should pop up before a comment or reply is deleted.
        - Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
        - You can only edit or delete your own comments and replies.

    FIXED:
        - MAJOR: mess around 'dater' to update user replies (@buildElement@icsbuildingsession.js:@50);
        - style about modal;
        - handle createdAt by Date; get latest ID from jsonData; (@chrome: 'dater' snippet);
        - reply/edit/delete button get event 'hover' "object{ pointer-events: none;}" did the trick;
        - edit case about 'dater' (?);
    TODO:
        MAJOR:
            - icsbuildsession.js@161, remove the object triggered by 'this.eventsStoreDelete' and put into localStorage. It belongs to an array from json. 
            - remove comments --> icsbuildsession.js@275: method 'deleter' to remove comment/reply;
        - score handling;
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