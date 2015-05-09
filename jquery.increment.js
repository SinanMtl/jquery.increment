
/*
* jQuery Increment
* http://sinanmutlu.com.tr/jquery.increment
* @author Sinan Mutlu
* @version 0.1.0
* Copyright 2015. Licensed under the MIT License (LICENSE.txt)
*/


"use strict";






(function($){

	var InputIncrement = function(el, opts){
		this.$el = $(el);
		this.data = this.$el.data();
		this.options = opts;
		this.render();
		this.up = this.up;
		this.down = this.down;
	};

	InputIncrement.prototype = {
		render : function(){
			this.$el.wrap("<div class=\"increment\" />");
			this.incrementContainer = this.$el.parent(".increment");
			this.incrementContainer.prepend("<button type=\"button\" class=\"plus btn btn-default\">+</button>").append("<button type=\"button\" class=\"minus btn btn-default\">-</button>");
			this.minus	= this.incrementContainer.children(".minus");
			this.plus	= this.incrementContainer.children(".plus");
			this.events();
		},
		up : function(){
			var value = this.checkValue( this.$el.val() );
			value = ( value >= parseInt(this.data.max) ? parseInt(this.data.max) : parseInt(value) + 1 );
			
			this.isDouble( value );
			return true;
		},
		events : function(){
			var _this = this;
			$(this.plus).bind("click", function(){
				_this.up();
			});

			$(this.minus).bind("click", function(){
				_this.down();
			});

			$(this.$el).bind("blur",function(){
				_this.controlValue( $(this).val() );
			});
		},
		controlValue : function(value){

			if( value > parseInt(this.data.max) || isNaN(value)){
				value = parseInt(this.data.max);
			} else if ( value < parseInt(this.data.min) ){
				value = parseInt(this.data.min);
			}

			return this.isDouble( value );
		},
		down : function(){
			var value = this.checkValue( this.$el.val() );
			value = ( value <= parseInt(this.data.min) ? parseInt(this.data.min) : parseInt(value) - 1 );
			
			this.isDouble( value );
			return true;
		},
		checkValue : function( value ){
			return ( this.empty(value) ? this.data.min : value );
		},
		doubleNumber : function( val ){
			var cift = ( val < 10 && val.toString().length <= this.data.max.toString().length ? "0" : "" )+ val;
			this.writeNumber( cift );
			return true;
		},
		regularNumber : function( val ){
			var num = (val < parseInt(this.data.min) ? parseInt(this.data.min) : val);
			this.writeNumber( parseInt(num) );
			return true;
		},
		writeNumber : function( val ){
			this.incrementContainer.find(this.$el).val(val);
			return true;
		},
		isDouble : function( value ){
			if( this.options.double ){
				this.doubleNumber(value);
			}else{
				this.regularNumber(value);
			}
			return true;
		},
		empty : function(str){
			if ( str === "" || str === null || str === undefined ) {
				return true;
			}
			return false;
		}
	};

	
	
	$.fn.increment = function(methodOrOptions){

		var defaultOptions = {
			double : false
		};
		
		var options = $.extend(defaultOptions, methodOrOptions);

		return this.each(function() {
			var inc = new InputIncrement( this, options );
		});

		

	};


})(jQuery);