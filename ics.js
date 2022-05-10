/*  
    TODO:
        - js/icsbuildsession@193-->176: localstorage does not update id if you comment twice.
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

//window.addEventListener('DOMContentLoaded', () => localStorage.clear());
ics();
