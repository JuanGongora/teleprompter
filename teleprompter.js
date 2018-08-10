function GetObjX(obj) {
    var rect = obj.getBoundingClientRect(); // returns the size of an element and its position relative to the viewport
    var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
    //  above, gets a reference to the root node of document, and gets/sets the number of pixels that an element's content is scrolled to left
    return(rect.left + scrollLeft); // current object position with space on left plus how much is currently being scrolled to left
}

function GetObjY(obj) {
    var rect = obj.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    return(rect.top + scrollTop);
}

function scroller(obj) {

    var isScrolling = 0;
    var step = 1;
    var minstep = 1;
    var waitmsecs = 100;
    var timerID = 0;

    var startScrolling = function() {
        isScrolling = 1; // true

        var newTop = parseInt(GetObjY(obj), 10) - step; // convert to int, then setting base of 10 to keep decimal numbers, not hexadecimal, then decrementing by step

        newTop+="px"; // converting value back into string readout and adding px to displayed definition

        obj.style.top = newTop; // specifies that the position of the object on the screen is now newTop

        timerID = window.setTimeout(startScrolling, waitmsecs); // recursive recall of function to continue scrolling
    };

    var stopScrolling = function() {
        isScrolling = 0; // false

        window.clearTimeout(timerID); // end the looping execution of the startScrolling function
    };

    var startOrStop = function() {
        if (isScrolling) stopScrolling(); // if scrolling is true then stop it
        else startScrolling(); // otherwise commence scrolling
    };

    var userInput = function(keyPress) {
        if (!keyPress) keyPress = event; // if there is not key press, set the value according to what's pressed, otherwise return nothing

        switch (keyPress.keyCode) { // event.keyCode returns the Unicode character of the key that's triggered
            case 32: // space
                startOrStop();
                break;
            case 37: // left arrow
                if (step > minstep) step--; // prevents pixel step amount from becoming a negative number, which would put scrolling to a complete halt
                break;
            case 39: // right arrow
                step++; // accelerates stepping
                break;
            default:
                break;
        }

        return false;
    };

    obj.onclick = startOrStop;
    document.onkeyup = userInput; // activates when user releases a key on document page
}