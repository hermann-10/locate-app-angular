import firebase from 'firebase/compat'

export interface User extends firebase.User {
   uid: string;
   email: string;
   displayName: string;
   //phoneNumber:number;
   //emailVerified: boolean;
   //isAdmin: boolean;
   //photoURL: string;
   createdAt: Date;
}


     
     
    


     