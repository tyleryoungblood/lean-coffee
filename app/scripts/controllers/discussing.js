/*jshint unused: false, undef:false */
'use strict';

var time, min, sec, timer;


function countDown(time, elementId) {
	var element = document.getElementById(elementId);
	document.body.style.backgroundColor='white';
	
	min = Math.floor(time / 60); //calculate the number of minutes
	sec = time - min * 60; // calculate remaining seconds

	if(sec<10) {
		sec = '0' + sec; //add a leading zero
	}

	element.innerHTML = 'Discussion Time Remaining: <b>' + min + ':' + sec + '</b>';

	if(time < 1) {
		//clearTimeout(timer);
		document.body.style.backgroundColor='red';
		element.innerHTML = '<button onclick="countDown(120, \'status\')"><i class="fa fa-refresh"></i></button> Continue? &nbsp;<button><i class="fa fa-smile-o"> 0</i></button>&nbsp;<button><i class="fa fa-meh-o"> 0</i></button>&nbsp;<button><i class="fa fa-frown-o"> 0</i></button>';
	} else {
		time--;
		timer = setTimeout('countDown(' + time + ', "' + elementId + '")', 1000);
	}


}