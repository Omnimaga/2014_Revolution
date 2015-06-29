// The purpose of this code is to fix the height of overflow: auto blocks, because some browsers can't figure it out for themselves.
function smf_codeBoxFix(){
	var codeFix = document.getElementsByTagName('code'),
		i;
	for(i = codeFix.length - 1; i >= 0; i--){
		if(is_webkit && codeFix[i].offsetHeight < 20){
			codeFix[i].style.height = (codeFix[i].offsetHeight + 20) + 'px';
		}else if(is_ff && (codeFix[i].scrollWidth > codeFix[i].clientWidth || codeFix[i].clientWidth === 0)){
			codeFix[i].style.overflow = 'scroll';
		}else if('currentStyle' in codeFix[i] && codeFix[i].currentStyle.overflow == 'auto' && (codeFix[i].currentStyle.height === '' || codeFix[i].currentStyle.height == 'auto') && (codeFix[i].scrollWidth > codeFix[i].clientWidth || codeFix[i].clientWidth === 0) && (codeFix[i].offsetHeight !== 0)){
			codeFix[i].style.height = (codeFix[i].offsetHeight + 24) + 'px';
		}
	}
}
// Add a fix for code stuff?
if((is_ie && !is_ie4) || is_webkit || is_ff){
	addLoadEvent(smf_codeBoxFix);
}
// Toggles the element height and width styles of an image.
function smc_toggleImageDimensions(){
	var oImages = document.getElementsByTagName('IMG'),
		oImage,
		onclick = function(){
			this.style.width = this.style.height = this.style.width == 'auto' ? null : 'auto';
		};
	for(oImage in oImages){
		// Not a resized image? Skip it.
		if(oImages[oImage].className === undefined || oImages[oImage].className.indexOf('bbc_img resized') == -1){
			continue;
		}
		oImages[oImage].style.cursor = 'pointer';
		oImages[oImage].onclick = onclick;
	}
}
// Add a load event for the function above.
addLoadEvent(smc_toggleImageDimensions);
// Adds a button to a certain button strip.
function smf_addButton(sButtonStripId, bUseImage, oOptions){
	var oButtonStrip = document.getElementById(sButtonStripId),
		aItems = oButtonStrip.getElementsByTagName('span'),
		oLastSpan,
		oButtonStripList,
		oNewButton;
	// Remove the 'last' class from the last item.
	if(aItems.length > 0){
		oLastSpan = aItems[aItems.length - 1];
		oLastSpan.className = oLastSpan.className.replace(/\s*last/, 'position_holder');
	}
	// Add the button.
	oButtonStripList = oButtonStrip.getElementsByTagName('ul')[0];
	oNewButton = document.createElement('li');
	setInnerHTML(oNewButton, '<a href="' + oOptions.sUrl + '" ' + ('sCustom' in oOptions ? oOptions.sCustom : '') + '><span class="last"' + ('sId' in oOptions ? ' id="' + oOptions.sId + '"': '') + '>' + oOptions.sText + '</span></a>');
	oButtonStripList.appendChild(oNewButton);
}

// Adds hover events to list items. Used for a versions of IE that don't support this by default.
// Add hover events to list items if the browser requires it.
if (is_ie7down && 'attachEvent' in window){
	window.attachEvent('onload',function(){
		var cssRule,
			newSelector,
			iStyleSheet,
			iRule,
			oListItems,
			oListItem,
			onmouseover = function(){
				this.className += ' iehover';
			},
			onmouseout = function(){
				this.className = this.className.replace(new RegExp(' iehover\\b'), '');
			};
		// Add a rule for the list item hover event to every stylesheet.
		for(iStyleSheet = 0; iStyleSheet < document.styleSheets.length; iStyleSheet ++){
			for(iRule = 0; iRule < document.styleSheets[iStyleSheet].rules.length; iRule ++){
				oCssRule = document.styleSheets[iStyleSheet].rules[iRule];
				if(oCssRule.selectorText.indexOf('LI:hover') != -1){
					sNewSelector = oCssRule.selectorText.replace(/LI:hover/gi, 'LI.iehover');
					document.styleSheets[iStyleSheet].addRule(sNewSelector, oCssRule.style.cssText);
				}
			}
		}
		// Now add handling for these hover events.
		oListItems = document.getElementsByTagName('LI');
		for(oListItem in oListItems){
			oListItems[oListItem].onmouseover = onmouseover;
			oListItems[oListItem].onmouseout = onmouseout;
		}
	});
}


// automatic responsive image resizing
$(function(){
	if($('.poster').length > 0){ // inside of a normal topic
		var $sheet = $('<style>').appendTo('head');
		$('#wrapper').resize(function(){
			// 90% - 88px - 15em(of .poster)
			var w = parseFloat($(window).width())*0.9-88-(15*Number(getComputedStyle($('.poster')[0], "").fontSize.match(/(\d*(\.\d*)?)px/)[1]));
			$sheet.html('img.bbc_img{max-width:'+w+'px;}');
		}).resize();
	}
	if($('.dp_news').length > 0){ // front page news
		$sheet = $('<style>').appendTo('head');
		$('#wrapper').resize(function(){
			var w = parseFloat($(window).width())*0.9 - 500;
			$sheet.html('img.bbc_img{max-width:'+w+'px;}');
		}).resize();
	}
});
