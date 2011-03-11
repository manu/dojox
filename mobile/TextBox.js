dojo.provide("dojox.mobile.TextBox");
dojo.experimental("dojox.mobile.TextBox");

dojo.require("dijit.form._TextBoxMixin");
dojo.require("dijit.form._FormWidgetMixin");

dojo.declare(
	"dojox.mobile.TextBox", 
	[dijit._WidgetBase, dijit.form._FormValueMixin, dijit.form._TextBoxMixin], {
		baseClass: "mblTextBox",

		buildRendering: function(){
			if(!this.srcNodeRef){
				this.srcNodeRef = dojo.create("input", {});
			}
			this.inherited(arguments);
			this.textbox = this.focusNode = this.domNode;
		},

		postCreate: function(){
			this.inherited(arguments);
			this.connect(this.textbox, "onfocus", "_onFocus");
			this.connect(this.textbox, "onblur", "_onBlur");
		}
	}
);