$(document).ready(function() {

	$(".page").stackpage({
		parent: '.wrap'
	});

	var customer_list_title = '<div class="tooltip-title">Customer list</div>' +
							  '<div class="tooltip-content">A list of current or potential customers that an advertiser uploads to Facebook. The listmay include phone numbers, email addresses or other information.</div>';

	$(".customer-list").tooltip({title: customer_list_title, offset: '-100, 10',
		html: true, placement: "bottom"}); 

	var businesstools = '<div class="tooltip-title">Business tools</div>' +
							  '<div class="tooltip-content">To help show people relevant ads based on their interations with other websites, apps or businesses, we offer Facebook Business Tools such as the Facebook Pixel, APIs and SDKs to our partners to be able to share data with us. ' + 
						'<a>Learn more</a>' + 
						'</div>';

	$(".business-tools").tooltip({title: businesstools, offset: '-100, 10',
		html: true, placement: "bottom"}); 

	var hoverTooltip = false;	

	var audinet = '<div class="tooltip-title">Facebook Audience Network</div>' +
				  '<div class="tooltip-content">The Audience Network is a way for advertisers to display ads on websites and apps across devices such as computers, mobile devices and connected TVs. When companies buy ads through Facebook, they can choose to have their ads distributed in the Audience Network.' + 
				  		'<a>Learn how to manage your ad preferences</a>' + 
				   '</div>';

	$(".audi-net").tooltip({title: audinet, offset: '-100, 10',
		html: true, placement: "bottom"});

	$(".business-tools").hover(function(e){
		$(".business-tools").tooltip('show');
		$(".tooltip-inner").hover(function(){
			hoverTooltip = true;
		}, function(){
			hoverTooltip = false;
			$(".business-tools").tooltip("hide");
		})
	}, function(){
		setTimeout(function(){
			if (hoverTooltip == false)
				$(".business-tools").tooltip('hide');
		}, 500);
	})

	$(".audi-net").hover(function(e){
		$(".audi-net").tooltip('show');
		$(".tooltip-inner").hover(function(){
			hoverTooltip = true;
		}, function(){
			hoverTooltip = false;
			$(".audi-net").tooltip("hide");
		})
	}, function(){
		setTimeout(function(){
			if (hoverTooltip == false)
				$(".audi-net").tooltip('hide');
		}, 500);
	})
});	

function myFunction() {
  var x = document.getElementById("myBottomnav");
  if (x.className === "bottomnav") {
    x.className += " responsive";
  } else {
    x.className = "bottomnav";
  }
}
