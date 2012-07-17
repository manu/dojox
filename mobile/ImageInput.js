define([
	"dojo/_base/declare",
	"dojo/dom-construct",
	"dojo/_base/connect",
	"dojo/dom-style",
	"dijit/_WidgetBase",
	"dijit/form/_FormValueMixin",
	"dijit/form/_TextBoxMixin"
], function(declare, domConstruct, connect, domStyle, WidgetBase, FormValueMixin, TextBoxMixin){

	/*=====
		WidgetBase = dijit._WidgetBase;
		FormValueMixin = dijit.form._FormValueMixin;
		TextBoxMixin = dijit.form._TextBoxMixin;
	=====*/
	return declare("dojox.mobile.ImageInput",[WidgetBase, FormValueMixin],{
		// summary:
		//		A non-templated base class for textbox form inputs

		baseClass: "mblImageInput",

		// Override automatic assigning type --> node, it causes exception on IE8.
		// Instead, type must be specified as this.type when the node is created, as part of the original DOM
		_setTypeAttr: null,

		// Map widget attributes to DOMNode attributes.
		_setPlaceHolderAttr: "image",
		
		buildRendering: function(){
			this.domNode = domConstruct.create("div", {});
			this.valueNode = domConstruct.create("input", (this.srcNodeRef && this.srcNodeRef.name) ? { type: "hidden", name: this.srcNodeRef.name } : { type: "hidden" }, this.domNode, "last");
			this.focusNode = this.canvasNode = domConstruct.create("canvas", { style:'width:100%; height:100%' }, this.domNode, "last");
			this.fileNode = domConstruct.create("input", { type: "file",style:'visibility: hidden; height: 0px'  }, this.domNode, "last");
			
		},
		fileChange: function(e){
                	var file=e.target.files[0];
                	if (file.type.match(/image.*/)) {
                    		var img = document.createElement("img");
                    		var reader = new FileReader();
                    		reader.onload = function(e) {img.src = e.target.result};
                    		reader.readAsDataURL(file);
				connect.connect(img, 'load', this, 'setCanvasImage');
                    	}else{
                     		console.info('This file is not an image.');
                	}
            	},
		setCanvasImage: function(e){
			var img = e.currentTarget;
	                var MAX_WIDTH = domStyle.get(this.domNode,'width');
	                var MAX_HEIGHT = domStyle.get(this.domNode,'height');
	                console.info(MAX_WIDTH, MAX_HEIGHT);
	                var width = img.width;
	                var height = img.height;
	                
	                console.info(width, height);
                	if (width < height) {
	                  if (width > MAX_WIDTH) {
        	            height *= MAX_WIDTH / width;
	                    width = MAX_WIDTH;
	                  }
                	} else {
			    if (height > MAX_HEIGHT) {
		                   width *= MAX_HEIGHT / height;
        		           height = MAX_HEIGHT;
	                  }
	         	}
	                this.canvasNode.width = width;
        	        this.canvasNode.height = height;
        	        domStyle.set(this.canvasNode, 'width', width+'px');
        	        domStyle.set(this.canvasNode, 'height', height+'px');
                	var ctx = this.canvasNode.getContext("2d");
                	ctx.drawImage(img, 0, 0,width, height);
		},

		postCreate: function(){
			this.inherited(arguments);
			connect.connect(this.canvasNode, "click", this.fileNode, "click");
			connect.connect(this.fileNode, "change", this, "fileChange");
		}
	});
});
