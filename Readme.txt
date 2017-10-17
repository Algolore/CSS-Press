				CSS-Press
				
	- A simpler way to create and manipulate CSS in JavaScript

	
CSS-Press was design to allow you to create interactive web pages by manipulating
the CSS properties of either iniviual html elements or a group of elements with
a single call.
This means you can treat a div and it sub html elements as a single object and 
interact with there CSS to change the look/behaviour with a single call.

Example :

Html : 
		<H1 id="title">CSS-Press example page</H1>
		
JavaScript :

	var CHANGE_CSS = new CSS_Press();  

	// ['Sub_ID', 'CLASS', 'CSS', 'VALUE']
	var css_data = [
			['', '', "position", "absolute" ],
			['', '', "top", "25px" ],
			['', '', "left", "200px" ],
			['', '', "background", "lightgrey" ],
			['', '', "border-radius", "4px" ],
		];

		CHANGE_CSS.apply_CSS("title",  css_data);


See the CSS-Press-Example.html to see it in action.


Inline Style

CSS-Press can also be used to create inline text string of CSS code to be used when you dynamically
create html elements in 

 		var my_id = "got_to_be_unique";
		
		// ['Sub_ID', 'CLASS', 'CSS', 'VALUE']
		var CSS_lb = [
				['lb', '', "position", "absolute" ],
				['lb', '', "top", "2px" ],
				['lb', '', "left", "10px" ],
			];
		
		
		// ['Sub_ID', 'CLASS', 'CSS', 'VALUE']
		var CSS_txtbx = [
				['txtbx', '', "position", "absolute" ],
				['txtbx', '', "top", "25px" ],
				['txtbx', '', "left", "0px" ],
				['txtbx', '', "background", "lightgrey" ],
				['txtbx', '', "width", '200px') ],
				['txtbx', '', "border-radius", "4px" ],
			];
			
		 
		var lb_id =  my_id + '_' + 'lb';
		var txtbx_id =  my_id + '_' + 'txtbx';
		
		var lb_style = CHANGE_CSS.CSS_str_style('lb', CSS_lb);
		var txtbx_style = CHANGE_CSS.CSS_str_style("txtbx", CSS_txtbx);
			
		var innerHTML_txt = '<label id="' + lb_id + '"' + lb_style + '>' + label + 
						'<input type="text" id="' + txtbx_id + '"' + txtbx_style + '>' + 
						'</label>';	
	
	
