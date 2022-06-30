/*
    --> README.md
        ### Expected behaviour
    FIXED:
        MAJOR:
            - fire mediaquery on page load or event, lot of mess. Try to trigger 'load' event in 'ics.js'. // Create div element inside rearrangeCommentContainer's foreEach loop.
            - Edit events in mobile design. Match tail-container with desktop case confirm-undo events: error@icsbuildession.js@338.

    TODO:
        MAJOR:
        - Events (e.g. add reply, vote, add response) on mobile design problem. (icsbuildtools:rearrangeCommentContainer()@203);
        
        - Adjust css for responsive design:
            - Margins of 'comment-user-tail-container-actions';
            - Comment line across replies;
        - get into mobile desing: new class added 'icsmq' to handle JS and CSS relating.
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
    /*document.addEventListener('load', () => {
        if(this.mediaQuery.matches) rearrangeCommentContainer();
    });*/
}

//window.addEventListener('DOMContentLoaded', () => localStorage.clear());
ics();