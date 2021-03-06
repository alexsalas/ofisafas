  window.liveSettings = {
    api_key: "17e4b5491bc14bf9846a857ffa41f8e6",
    picker: "tx-live-lang-picker",
    detectlang: true,
    autocollect: false
  };

//This is called each time the languages list is retrieved
//from Transifex Live. This may happen more than once so we should
//be able to handle this case.
Transifex.live.onFetchLanguages(function(languages) {

    //set the language selector to the source language (default)
   // $('#language-current').html(
   //     Transifex.live.getSourceLanguage().name
   // );
/*
    //empty our language list
    $('#language-selector').empty();

    //add translation languages to the list
    for (var i = 0; i < languages.length; ++i) {
        $('#language-selector').append(
            '<li data-code="' + languages[i].code +
            '" data-name="' + languages[i].name +
            '">' + languages[i].name + '</li>'
        );
    }

    //handle user selecting a language
    $('#language-selector').find('li').click(function(e) {
        e && e.preventDefault();
        var code = $(this).closest('[data-code]').data('code');
        var name = $(this).closest('[data-code]').data('name');

        //tell transifex live to translate the page
        //based on user selection
        Transifex.live.translateTo(code, true);
    });

    //called when Transifex Live successfully translates the
    //page to a language. In that case lets update the
    //selected language of the widget
    Transifex.live.onTranslatePage(function(language_code) {
        $('#language-current').html(
            Transifex.live.getLanguageName(language_code)
        );
    });*/
		$( "#tx-live-lang-picker" ).empty();
    for (var i = 0; i < languages.length; ++i) {
            console.log("code: "+languages[i].code);
            console.log("name: "+languages[i].name);
			$( "#tx-live-lang-picker" ).append('<option value='+languages[i].code+'>'+languages[i].name+'</option>');
    }
   Transifex.live.onTranslatePage(function(language_code) {
        console.log("onTranslatePage: "+Transifex.live.getLanguageName(language_code));
    });
	
		console.log("getSourceLanguage: "+Transifex.live.getSourceLanguage().name);
	 console.log("detectlang: "+window.liveSettings.detectlang);
		

});

$( "#tx-live-lang-picker" ).change(function() {
	Transifex.live.translateTo($( "#tx-live-lang-picker" ).val(), true);
});

var userLang = navigator.language || navigator.userLanguage;

console.log("userLang.split: "+userLang.split('-')[0]);
console.log("userLang: "+userLang);
console.log("systemLanguage: "+navigator.systemLanguage);
console.log("browserLanguage: "+navigator.browserLanguage);
console.log("languages: "+navigator.languages);

// Initialize your app
var myApp = new Framework7({
    pushState: false,
    modalTitle: 'OFISAFAS®',
		pushStateRoot: 'http://127.0.0.1:58521/',
		smartSelectBackText: 'Atras',
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// Export selectors engine
var $$ = Framework7.$;

// Add views
var leftView = myApp.addView('.view-left', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
});


// Option 1. Using one 'pageInit' event handler for all pages (recommended way):
$$(document).on('pageInit', function (e) {
  // Get page data from event data
  var page = e.detail.page;
  
  if (page.name === 'about') {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page');
  }
})
 
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
  // Following code will be executed for page with data-page attribute equal to "about"
	//myApp.alert('Here comes About page');

})

myApp.onPageInit('about', function (page) {
  console.log('About page initialized');
  console.log(page);
});

myApp.onPageInit('location', function (page) {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
	 var myLatlng = new google.maps.LatLng(10.233847, -68.0052475);

	var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 16,
			disableDefaultUI: true,

			// The latitude and longitude to center the map (always required)
			center: myLatlng, // Valencia

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{		featureType:'water', 					stylers:[{color:'#46bcec'},	{visibility:'on'}]},
							 {		featureType:'landscape',			stylers:[{color:'#efeff4'}]},
							 {		featureType:'road',						stylers:[{saturation:-100},	{lightness:45}]},
							 {		featureType:'road.highway',		stylers:[{visibility:'simplified'}]	},
							 {		featureType:'road.arterial',	stylers:[{visibility:'off'}], elementType:'labels.icon'},
							 {		featureType:'road.highway',		stylers:[{color:'#ffffff'}], 	elementType: 'geometry.fill'},
							 {		featureType:'road.arterial',	stylers:[{color:'#ffffff'}], 	elementType: 'geometry.fill'},
							 {		featureType:'road.local',			stylers:[{color:'#ffffff'}], 	elementType: 'geometry.fill'},
							 {		featureType:'administrative',	stylers:[{color:'#444444'}],	elementType:'labels.text.fill'},
							 {		featureType:'transit',				stylers:[{visibility:'off'}]},
							 {		featureType:'poi',						stylers:[{visibility:'on'}]},
 							 {    featureType:'poi',   					stylers:[{ visibility:'off'}], elementType: 'geometry.fill'},
							 {    featureType:'poi',   					stylers:[{ visibility:'off'}], elementType: 'labels.icon'}]
	};

	// Get the HTML DOM element that will contain your map 
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map');

	// Create the Google Map using out element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);
	

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'OFISAFAS',
			icon: 'images/marker.png'
  });
	
	marker.setAnimation(google.maps.Animation.DROP);

	$( window ).resize(function() {
    window.setTimeout(function() {
      map.panTo(myLatlng);
    }, 30);

	});

});

myApp.onPageInit('services', function (page) {
  //mainView.loadPage('about.html');
	myApp.alert('Here comes Services page');
});

myApp.onPageInit('grid', function (page) {
  //mainView.loadPage('about.html');
	//Grid.init();
});

//Sometimes we may need the same callback for few pages. We may separate page names with space:
myApp.onPageInit('about services', function (page) {
  console.log(page.name + ' initialized'); 
  //In console we will see 'about page initialized' for About page and 'services page initialized' for Services page
});
 

 
//We can also add callback for all pages:
myApp.onPageInit('calendar', function (page) {
			
				var cal = $( '#calendar' ).calendario( {
						onDayClick : function( $el, $contentEl, dateProperties ) {

							for( var key in dateProperties ) {
								console.log( key + ' = ' + dateProperties[ key ] );
							}

						},
						caldata : codropsEvents
					} ),
					$month = $( '#custom-month' ).html( cal.getMonthName() ),
					$year = $( '#custom-year' ).html( cal.getYear() );

				$( '#custom-next' ).on( 'click', function() {
					cal.gotoNextMonth( updateMonthYear );
				} );
				$( '#custom-prev' ).on( 'click', function() {
					cal.gotoPreviousMonth( updateMonthYear );
				} );
				$( '#custom-current' ).on( 'click', function() {
					cal.gotoNow( updateMonthYear );
				} );

				function updateMonthYear() {				
					$month.html( cal.getMonthName() );
					$year.html( cal.getYear() );
				}

				// you can also add more data later on. As an example:
				
	/* 								cal.setData( {
						'04-08-2014' : '<a href="#">testing</a>',
						'08-04-2014' : '<a href="#">testing</a>',
						'03-12-2013' : '<a href="#">testing</a>'
					} ); */
					// goes to a specific month/year
					//cal.goto( 3, 2013, updateMonthYear );
				
			
});

/*=== As Page ===*/
var promoBrowserPage = myApp.photoBrowser({
    photos: [
        'images/promo/hercules.jpg',
        'images/promo/sahara.jpg'
    ],
		spaceBetween: 0,
    type: 'page',
    backLinkText: 'Atras',
		zoom: false,
		theme: 'dark',
		maxZoom: 1,
		minZoom: 1
});
			
$$('.promo').on('click', function () {
		promoBrowserPage.close();
    promoBrowserPage.open();
		
		//console.log(promoBrowserPage);
});


myApp.onPageAfterAnimation('photo-browser-slides', function (page) {
  promoBrowserPage.expositionOn();
});

myApp.onPageBeforeRemove('photo-browser-slides', function (page) {
  //promoBrowserPage.expositionOff();
});

//We can also add callback for all pages:
myApp.onPageInit('*', function (page) {
  console.log(page.name + ' initialized'); 
	Transifex.live.translateNode($('.view-main').get(0));
	promoBrowserPage.expositionOff();
});

	// Loading flag
	var loading = false;

	// Last loaded index
	

	// Max items to load
	var maxItems = 60;

	// Append items per load
	var itemsPerLoad = 20;

//Sometimes we may need the same callback for few pages. We may separate page names with space:
myApp.onPageInit('news', function (page) {
	var lastIndex = $$('.ok li').length;
	console.log(lastIndex);
	// Attach 'infinite' event handler
	$$('.infinite-scroll').on('infinite', function () {

		// Exit, if loading in progress
		if (loading) return;

		// Set loading flag
		loading = true;

		// Emulate 1s loading
		setTimeout(function () {
			// Reset loading flag
			loading = false;

			if (lastIndex >= maxItems) {
				// Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
				myApp.detachInfiniteScroll($$('.infinite-scroll'));
				// Remove preloader
				$$('.infinite-scroll-preloader').remove();
				return;
			}

/*			// Generate new items HTML
			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
				html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
			}

			// Append new items
			$$('.time-line-content').append(html);*/
			
/*			$('.time-line-content').load( "post.html", function() {
				alert( "Load was performed." );
			});
			*/
			$.get( "post.html", function( data ) {
				$( ".time-line-content" ).append(data);
			});

			// Update last loaded index
			lastIndex = $$('.ok li').length;
		}, 1000);
	});   
});
 


myApp.onPageInit('contacts', function (page) {
/*	$$('form.ajax-submit').on('submitted', function (e) {
		var xhr = e.detail.xhr; // actual XHR object

		var data = e.detail.data; // Ajax repsonse from action file
		// do something with response data
	});*/
	
	$$('.send').on('click', function(){
		var formData = myApp.formToJSON('#contact');
		myApp.formStoreData('contact', formData);
		console.log(formData);
	}); 
});