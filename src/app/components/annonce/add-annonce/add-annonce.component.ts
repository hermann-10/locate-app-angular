import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/interface/offer';
import { OffersService } from 'src/app/shared/services/offers.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css']
})
export class AddAnnonceComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  addOfferForm!: FormGroup
  offers:Offer[] = [];
  currentOfferPhotoFile!:any;
  currentOfferPhotoUrl!: string;

    closeResult: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private offersService: OffersService,
    private modalService: NgbModal
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

   /**
   * Write code on Method
   *
   * @return response()
   */
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  initOfferForm(): void {
    this.addOfferForm = this.formBuilder.group({
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
    const offerId = this.addOfferForm.value.id;
    let offer = this.addOfferForm.value;
    const offerPhotoUrl = this.offers.find(el => el.id === offerId)?.photo;
    offer = {...offer, photo: offerPhotoUrl};
    if(!offerId || offerId && offerId === ''){ //CREATION
      delete offer.id;
      this.offersService.createOffer(offer, this.currentOfferPhotoFile).catch(console.error);
    } else{ //MODIFICATION
      delete offer.id;
      this.offersService.editOffer(offer, offerId, this.currentOfferPhotoFile).catch(console.error);  
    }
    this.addOfferForm.reset();
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
    this.addOfferForm.setValue({
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
