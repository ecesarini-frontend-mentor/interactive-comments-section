/*  
    TODO:
        - this.json.data successfully draws up replies. Need to do the same about 'event reply'. It starts from 'this.eventsStore()'.
            @202@208
        - need to match 'edit response' with events. Take a look to '\\DESKTOP:/get_id.jpg' to debug. Target is dybamically get id from container hosting event repsonse.
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
