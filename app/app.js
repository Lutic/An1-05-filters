(function() {
	"use strict";

	angular
		.module("app", ["ngSanitize", "feature"])
		.controller("Default", Default)
		.filter("labelCase", labelCase)
		.filter("skip", skip)
		.filter("take", take);

	function Default(productData) {
		var $ctrl = this;
		$ctrl.products = productData.products;
		$ctrl.getExpiryDate = getExpiryDate;
		$ctrl.customSort = customSort;
		$ctrl.selectItems = selectItems;
		$ctrl.skip = skip;

		function getExpiryDate(days) {
			var now = new Date();
			return now.setDate(now.getDate() + days);
		}

		function customSort(item) {
			return item.expiry < 5 ? 0 : item.price;
		}

		function selectItems(item) {
			return item.category == "Fish" || item.beer == "Beer";
		}

		function skip () {
			return function (input, count) {
				return input.slice(count);
			};
		}


		$ctrl.htmlSnippet =
			'Pretty text with some links:\n'+
			'http://angularjs.org/,\n'+
			'mailto:us@somewhere.org,\n'+
			'another@somewhere.org,\n'+
			'and one more: ftp://127.0.0.1/.';
	}

	function labelCase () {
		return function (input, reverse) {
			return reverse
				? ( angular.lowercase(input[0] + angular.uppercase(input.substring(1).uppercase)))
				: ( angular.uppercase(input[0] + angular.lowercase(input.substring(1).uppercase)))
		};
	}

	function take ($filter) {
		return function (input, skipCount, takeCount) {
			let tmp = $filter("skip")(input, skipCount);

			return $filter("limitTo")(tm, takeCount);
		}
	}

	angular.element(document).ready(() => {
		angular.bootstrap(document, ["app"]);
	});

})();

















