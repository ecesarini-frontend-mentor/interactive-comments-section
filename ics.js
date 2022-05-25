/*  
    FIXED:
        - reply (//Desktop/Screenshot 2022-05-17 001102.jpg) doesn't work: add look at screenshot and add way to fit it (clicking on 'reply'  about 'remyorbson').
          look at js/icsbuildsession.js@218 to evaluate reply type.
        - manage: edit and delete: @icsbuildsession.js:@269, after you click on reply new element is added, but it's not well-handled by eventListener. Chectk this out.
        - once clicked 'edit', comment field is editable;
    TODO:
        - need to match 'edit response' with events. Take a look to '\\DESKTOP:/get_id.jpg' to debug. Target is dybamically get id from container hosting event repsonse.
        - (appereance: https://jeth0214.github.io/FE-interactive-comments-section/);
        - handle createdAt by Date; get latest ID from jsonData; 
    
*/

import {IcsStyle} from './js/icsstyle.js';
import {BuildSession} from './js/icsbuildsession.js';

function ics() {
    document.addEventListener('DOMContentLoaded', () => localStorage.clear());

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
