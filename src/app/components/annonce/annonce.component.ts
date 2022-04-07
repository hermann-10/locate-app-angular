import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/interface/offer';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  offerForm!: FormGroup
  offers:Offer[] = [];
  currentOfferPhotoFile!:any;
  currentOfferPhotoUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private offersService: OffersService
  ) { }

  ngOnInit(): void {
    this.initOfferForm();
    this.subscription = this.offersService.offersSubject.subscribe({ //on s'abonne
      next: (offers: Offer[]) => {
        console.log('NEXT');
        this.offers = offers
      },
      error: (error) => {
        console.error(error);
      }

    })
    this.offersService.getOffers(); // on déclence la fonction getOffers
  }

  initOfferForm(): void {
    this.offerForm = this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      photo: [],
      brand: ['', ],
      model: ['', ],
      description: ['', ],
      price: 0
    })
  }

  onSubmitOfferForm(){
    console.log('Coucou ');
    const offerId = this.offerForm.value.id;
    let offer = this.offerForm.value;
    const offerPhotoUrl = this.offers.find(el => el.id === offerId)?.photo;
    offer = {...offer, photo: offerPhotoUrl};
    if(!offerId || offerId && offerId === ''){ //CREATION
         console.log('Création');
      delete offer.id;
      this.offersService.createOffer(offer, this.currentOfferPhotoFile).catch(console.error);
    } else{ //MODIFICATION
         console.log('Coucou modification')
      delete offer.id;
      this.offersService.editOffer(offer, offerId, this.currentOfferPhotoFile).catch(console.error);  
    }
    this.offerForm.reset();
    this.currentOfferPhotoFile = null;
    this.currentOfferPhotoUrl = '';
  }

  onChangeOfferPhoto($event: any):void{
    this.currentOfferPhotoFile = $event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.currentOfferPhotoFile);
    fileReader.onloadend = (e) => {
      this.currentOfferPhotoUrl = <string>e.target?.result;
    }
  }

  onEditOffer(offer:Offer): void{
    this.currentOfferPhotoUrl = offer.photo? <string> offer.photo : '';
    this.offerForm.setValue({
      id: offer.id ? offer.id : '',
      title: offer.title ? offer.title : '',
      photo: '',
      brand: offer.brand ? offer.brand : '',
      model: offer.model ? offer.model : '',
      price: offer.price ? offer.price : '',
      description: offer.description ? offer.description : '',
    });
  }

  onDeleteOffer(offerId?:string):void{
    if(offerId){
      this.offersService.deleteOffer(offerId).catch(console.error);
    } else {
      console.error('An id must be provided to delete an offer');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
