import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

declare var google;

@IonicPage()
@Component({
	selector: 'page-product',
	templateUrl: 'product.html',
})
export class ProductPage {

	@ViewChild('map') mapElement: ElementRef;
	@ViewChild('directionsPanel') directionsPanel: ElementRef;
	map: any;
	showDirection: boolean;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private geolocation: Geolocation,
		private platform: Platform,
		private push: Push) {
		platform.ready().then(() => {
			this.loadMap();
		});

		this.showDirection = false;
	}

	loadMap(){

		this.geolocation.getCurrentPosition().then((position) => {

			let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			let mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

			this.addMarker(latLng);

			//this.startNavigating();

		}, (err) => {
			console.log(err);
		});

	}
	showDir(){
		this.showDirection = true;
	}
	addMarker(latLng){

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.DROP,
			position: latLng
		});

		let content = "<h4>Information!</h4>";         

		this.addInfoWindow(marker, content);

	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});

	}

	startNavigating(){
		let directionsService = new google.maps.DirectionsService;
		let directionsDisplay = new google.maps.DirectionsRenderer;

		directionsDisplay.setMap(this.map);
		directionsDisplay.setPanel(this.directionsPanel.nativeElement);

		directionsService.route({
			origin: 'chennai cmbt',
			destination: 'porur',
			travelMode: google.maps.TravelMode['DRIVING']
		}, (res, status) => {

			if(status == google.maps.DirectionsStatus.OK){
				directionsDisplay.setDirections(res);
			} else {
				console.warn(status);
			}

		});
	}

}
