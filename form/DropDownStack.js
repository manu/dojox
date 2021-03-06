define([
	"dijit/form/Select",
	"./_SelectStackMixin",
	"dojo/_base/declare"
], function(Select, _SelectStackMixin, declare){

	// module:
	//		dojox/form/DropDownStack
	// summary:
	//		A dropdown-based select stack.

	return declare("dojox.form.DropDownStack", [ Select, _SelectStackMixin ]);
});