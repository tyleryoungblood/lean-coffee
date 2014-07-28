/*jshint unused:false*/
/* global app:true */
'use strict';

var time, min, sec, timer;

function countDown(time, elementId) {
	var element = document.getElementById(elementId);
	min = Math.floor(time / 60); //calculate the number of minutes
	sec = time - min * 60; // calculate remaining seconds

	if(sec<10) {
		sec = '0' + sec; //add a leading zero
	}

	element.innerHTML = 'Discussion Time Remaining: <b>' + min + ':' + sec + '</b>';

	if(time < 1) {
		//clearTimeout(timer);
		element.innerHTML = 'Time has expired. <a href="" onclick="countDown(12, \'status\')">Restart?</a>';
	}

	time--;

	timer = setTimeout('countDown(' + time + ', "' + elementId + '")', 1000);
}