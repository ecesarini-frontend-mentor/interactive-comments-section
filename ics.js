/*  
    FIXED:
        - @icsbuildsesssion.js-->handleEvent:@191: make 'add-response-button' independent by reply or comment.
        - control of the event on buildEvent: it works with reply-nested, not on first reply. Check icsbuildsession.js@168 deugging,
        - reply (//Desktop/Screenshot 2022-05-17 001102.jpg) doesn't work: add look at screenshot and add way to fit it (clicking on 'reply'  about 'remyorbson').
          look at js/icsbuildsession.js@218 to evaluate reply type.
    TODO:
        - manage: edit and delete: @icsbuildsession.js:@244:this.editor(appereance: https://jeth0214.github.io/FE-interactive-comments-section/);
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
