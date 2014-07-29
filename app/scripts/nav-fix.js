/*jshint unused: false, undef:false */
/* global app:true */
'use strict';

/************************************************************
* This js is used to fix the bug with angular and bootstrap *
* that causes the dropdown nav menu to remain open after a  *
* link is clicked. Fix from kevinknelson's solution here:   *
* https://github.com/twbs/bootstrap/issues/9013             *
************************************************************/

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});