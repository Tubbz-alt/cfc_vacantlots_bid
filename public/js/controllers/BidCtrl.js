angular.module('vacantlotsApp').controller('BidCtrl', function(sharedProperties)
{
    console.log('In bid control.')
	var vm = this;
    this.propertyName = sharedProperties.getString();

});
