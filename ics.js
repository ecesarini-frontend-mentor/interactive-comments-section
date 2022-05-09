/*  
    FIXED: 
        - js/icsbuildsession -->jsbuildContent@103, (reply, edit, delete) buttons;
    TODO:
        MAJOR:
            - handle event, by js/icsbuildsession@185 
            - rearranging 'icsbuildsessions.js': comment container maintaining its own properties when you create new one; @172 manage request and be aware about @150 'activeBtn'
            - @debug './js/icsbuildsession.js'@89@174 // just understand how display replies; // where, emphasis, etc.
        - store into localStorage input event; // to emprove
        - handle createdAt by Date; get latest ID from jsonData; 
    
*/

import {IcsStyle} from './js/icsstyle.js';
import {BuildSession} from './js/icsbuildsession.js';

function ics() {
    let elClk = document.querySelectorAll('button'),
        evClk = ['mouseover', 'mouseout', 'mousedown', 'mouseup'],
        moderateBlue = 'hsl(238, 40%, 52%)',
        grayishBlue = 'hsl(211, 10%, 45%)',
        deepPink = 'hsl(328, 100%, 54%)';

    new IcsStyle(elClk, evClk, moderateBlue, grayishBlue, deepPink);
    new BuildSession('./data.json');
    //document.addEventListener('DOMContentLoaded', () => new HandleActivities());
    //new HandleActivities();
}

window.addEventListener('DOMContentLoaded', () => localStorage.clear());
ics();
