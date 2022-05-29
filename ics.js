/*  
    FIXED:
        - replies work;

    TODO:
        - \\DESKTOP:'ics_edit_response.jpg' screenshoot, css doesn't respect margins;
        - js/icsbuildsession.js@208: catching edit target, take a look;
        - added 2 debugger inside icsbulidsession.js to dig into edited element;
        - (appereance: https://jeth0214.github.io/FE-interactive-comments-section/);
        - handle createdAt by Date; get latest ID from jsonData; 
    
*/

import {IcsStyle} from './js/icsstyle.js';
import {BuildSession} from './js/icsbuildsession.js';

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

