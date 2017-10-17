class CSS_Press {
// This class allows CSS to be stored in a Data Structure and them applied (pressed) on to any
// html elements via there ids. It allows multiple CSS properites to be applied in a single action.
// The CSS information is stored in an array of arrays, and we can apply it in a number
// of different ways
//
// Designed and Implemented 
// Paul Bredin  22/08/2017
 

 // Format
// ['Sub_ID', 'CSS_Class', 'CSS_properties', 'CSS_value']

 
	constructor(){
		
		this._element_id = {}; // We store dom lookup for performance
		this._get_id_obj = new ID_CSS();
//		this._unique_id_obj = new Unique_ID(); // Not used in demo, still under testing
		
		// Maps the existance of data structure field to its implementation, the dynamic API lookup
		this._lookup = {"0000" : 0, "0010" : 2, "0011" : 3, "0100" : 4, "1000" : 8, "1010" : 10, "1011" : 11, "1100" : 12};

	}
	
	apply_CSS(ID , JSON_DS){
	// Applies a number of CSS stored in a Data Structure to a html element ID
	 
		var no_style, pos, style_obj, element_id, css_class, css_style, css_value, full_id, sub_id, sub_style_obj;
		var d1,d2,d3,d4, digit_key, rule;
		
		no_style = JSON_DS.length;
		
		var style_obj = this._get_id_obj.get_ID_style(ID);
		
		if (!style_obj){			
			alert("Error in applying CSS : " + ID );
			return false;
		}
		
		for (pos = 0; pos < no_style; pos++){
			
			[element_id, css_class, css_style, css_value] = JSON_DS[pos];
		
			// See which parameters are there and which are empty to construct the key by
			d1 = (element_id.length > 0) ? '1' : '0';
			d2 = (css_class.length > 0) ? '1' : '0';
			d3 = (css_style.length > 0) ? '1' : '0';
			d4 = (css_value.length > 0) ? '1' : '0';
			
			digit_key = d1 + d2 + d3 + d4; // Construct lookup key
						
			if (this._lookup[digit_key]){
				rule = this._lookup[digit_key];
			} else { // No rule match, Error in CSS Data Structure
				rule = -1;
			}
			
			if (d1 == '1'){ // Dealing with a element within the widget (sub object)
				// var sub_id = this._unique_id_obj.sub_ID(ID, element_id);
				var sub_id = ID + "_" + element_ID;
				sub_style_obj = this._get_id_obj.get_ID_style(sub_id);
			} else {
				sub_style_obj = null;
			}
			
			switch(rule) {
			
				case 0: // Reset Widget div style to default
					style_obj.class = "";
					break;
					
				case 2: // Reset a stye in the widget div to default
					style_obj[css_style] = "";
					break;
					
				case 3: // Assign a new style to a widget div value
					style_obj[css_style] = css_value;
					break;
					
				case 4: // Assing a new Class name to the Widget ID
					style_obj.class = css_class;
					break;
					
				case 8: // Reset a sub element style class to default
					 
					sub_style_obj.class = "";
					break;
					
				case 10: // Resert a sub wlement indiviual style to default
					 
					sub_style_obj[css_style] = "";
					break;
					
				case 11: // Assign a new value to a sub element style
				
					sub_style_obj[css_style] = css_value;
					break;
					
				case 12: // assign a new class to a sub element
					 
					sub_style_obj.class = css_class;
					break;
					
				default: // Error in the CSS Data Structure as it is invalid
					// ERROR in CSS Data Structure
					alert("ERROR in CSS Data Structure");
					
			}
 
		} // End for loop
	}
		
		
	apply_CSS_Style_Obj(style_obj, css_ds){	
	// Given a 'style object' will apply all the css_style values to it, there is no
	// filtering based on id or sub id values,
	// Used in the creation of 'div'
	
		var no_style, pos, element_id, css_class, css_style, css_value;
		no_style = css_ds.length;
		
		for (pos = 0; pos < no_style; pos++){
			
			[element_id, css_class, css_style, css_value] = css_ds[pos];
			
			if (css_style.length > 0) {
				style_obj[css_style] = css_value;
			}
		}
	}
		
	CSS_str(sub_id, css_data){
	// Optiona two parameter API
	// CSS_str(css_data) - construct CSS from all sub_id names
	//	CSS_str(sub_id, css_data) - only matching sub_id will be in returned CSS
	// Given a CSS data structure will produce a encoded string to allow the style to be
	// used in HTML 
	
		var no_arg = arguments.length;
		var id, css_ds;
		var match_id = false;
		
		if (no_arg = 2){
			id = sub_id;
			css_ds = css_data;
			match_id = true;
		} else {
			id = "";
			css_ds = sub_id;
		}
	
		var no_style, pos, element_id, css_class, css_style, css_value, html_str = "";
		no_style = css_ds.length;
	
		for (pos = 0; pos < no_style; pos++){
			
			[element_id, css_class, css_style, css_value] = css_ds[pos];
					
			if ((css_style.length > 0) && ((match_id && (element_id == id)))){
			
				css_value = (css_value.length > 0) ? css_value : "''"; // can reset a css value
				html_str += css_style + ":" + css_value +"; ";

			}
		}

		return html_str;
	
	}
		
	CSS_str_style(sub_id, css_data){
	// Optiona two parameter API
	// CSS_str(css_data) - construct CSS from all sub_id names
	//	CSS_str(sub_id, css_data) - only matching sub_id will be in returned CSS
	// Given a CSS data structure will produce a encoded string to allow the style to be
	// used in HTML 
	// Return a text string with 'style = "css_tag:css_value, , )" or a empty string of no
	// styles matches
		
		var style_txt = this.CSS_str(sub_id, css_data);
		
		style_txt = (style_txt.length > 0 ) ? ' style="' + style_txt + '" ' : "";
		
		return style_txt;
	
	}
		
	
	To_Camal_Case(tag){
	//  background-color to backgroundColor	
		
		return tag.replace(/(-.)/g,function(x){return x[1].toUpperCase()});
		
	}

	From_Camal_Case(tag){
	// backgroundColor to background-color
	
			return tag.replace(/([A-Z])/g, "-$1").toLowerCase(); 
	}
	
		
	add(ds_a, ds_b){
	// Adds ds_b (data structure b) to ds_a and returns a new data structure
	// If there are two tags the same, then ds_b will be the one returned
		
		var ds_a_key, ds_b_key;
		var hash_a = this._tranform_hash(ds_a);
		var hash_b = this._tranform_hash(ds_b);

		for (ds_b_key in hash_b){ // Add hash_b to hash_a overwriting any existing keys
				hash_a[ds_b_key] = hash_b[ds_b_key];
		}
		
		return this._hash_to_array(hash_a); // Convert the hash to new array
	}
	
	
	subtract(ds_a, ds_b){
		var ds_a_key, ds_b_key;
		var hash_a = this._tranform_hash(ds_a);
		var hash_b = this._tranform_hash(ds_b);
		var ds_css = [];
		
		for (ds_b_key in hash_b){ // Add hash_b to hash_a overwriting any existing keys
				
			if (hash_a[ds_b_key]){
				delete hash_a[ds_b_key];
			}	 
		}
		
		return this._hash_to_array(hash_a); // Convert the hash to new array
	}
	
	clone(ds_a){
	// Clones the Array of Array into a new Array of Array so that thay are independent
	
		var new_arr = [];
		var pos = 0;
		var no_style = ds.length;
		for (pos = 0; pos < no_style; pos++){ // Create hash table for key compare
			new_arr[pos] = ds_a[pos].slice();
		}
		
		return new_arr;
	}
	
	reset_default(ds){
	// Given Stamper CSS data structure will create a new one that reset the CSS to '',
	// These are class names and css_value will be set to ''
		
		var pos, element_id, css_class, css_style, css_value;
		var new_arr = [];
		var no_style = ds.length;
		for (pos = 0; pos < no_style; pos++){ // Create hash table for key compare
			
			new_arr[pos] = ds[pos].slice;
			new_arr[pos][CSS_CLASS] = ''; // Set Class name to ''
			new_arr[pos][CSS_VALUE] = ''; // Set CSS value to ''
		}
		
		return new_arr;
	}
	
	
	_tranform_hash(ds){
	// Given a data structure array of array, will construct a lookup key to compare the first four fields
	// and return a hash
		
		var pos, element_id, css_class, css_style, css_value, ds_key;
		var ret_hash = {};
		var no_style = ds.length;
		for (pos = 0; pos < no_style; pos++){ // Create hash table for key compare
			
			[element_id, css_class, css_style, css_value] = ds[pos];
			
			element_id = element_id || "-";
			css_class = css_class || "-";
			css_style = css_style || "-"; 
			css_value = css_value || "-";
			
			ds_key = element_id + "%" + css_class  + "%" +  css_style  + "%" +  css_value;
			
			ret_hash[ds_key] = ds[pos];
		}
		
		return ret_hash;
	}
	
	_hash_to_array(hash_ref_arr){
	// Given a hash which points to array references will return a new copy of an array of array
	
		var hash_key;
		var ds_css = [];
		var pos = 0;
		
		for (hash_key in hash_ref_arr){ // Costruct the new combined array of array
			ds_css[pos++] = hash_ref_arr[hash_key].slice();
		}	
		
		return ds_css;
	}
		
		
}

class ID_CSS {
// A class that provide the CSS lookup, it allows us to cache values so
// we can improve performance
	
	constructor(){ // Singeton Class constructor
		if(! ID_CSS.instance){
		
			this._ID_lookup = {}; // The hash that we do the caching to 
		
			ID_CSS.instance = this;
		}
			return ID_CSS.instance;
	}
	
	get_ID_style(id){
	// Given  Element ID value will return it style object	
			
		var id_obj = undefined;
		var style_obj = undefined;
		
		if (this._ID_lookup[id]){
			id_obj = this._ID_lookup[id];
			return id_obj;
		} else {
			
			id_obj = document.getElementById(id);
			
			if (! id_obj){ // Error return null
			alert("ERROR - Can't find Object ID : " + id + "\n\n");
				return null;
			}
			
			style_obj = id_obj.style;
			
			// Need to do some error checking here
			
			this._ID_lookup[id] = style_obj;
			
			return style_obj;
		}
	}
	
	
}