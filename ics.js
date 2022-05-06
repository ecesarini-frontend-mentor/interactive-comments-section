/*  
    FIXED: 
        - inherited class HandleEvent doesn't trigger on page 'first load'. --> it depends on 'promise getJson';
        - use modules --> 'master.js' needs to be a module too;
        - vanishing textarea after click --> refres obj style: that is this.commentBoxTextarea.value = '';
        - order 'id' object from localStorage['jsonData']; catch the higher; // to emprove depending on first TODO
    TODO:
        MAJOR:
            - rearranging 'icsbuildsessions.js': comment container maintaining its own properties when you create new one; @172 manage request and be aware about @150 'activeBtn'
            - big mess about 'reply': append grid-line, object json, comments fly around: @getCommentObject dig into 'cuObj.content = this.commentBoxTextarea.value;'
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
