import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {Mensaje} from "../interface/mensaje.interface";
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
export interface Item { mensaje: string; }
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
     items: Observable<Item[]>;
    public chats:Mensaje[]=[];
    public usuario:any={};
    constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user=>{

        if  (!user){
          return;
        }
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.photoURL = user.photoURL;
        
      })
     }

    login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario={};
    this.afAuth.auth.signOut();
  }
    cargar_mensajes(){
      this.itemsCollection = this.afs.collection<Mensaje>('chats',ref=>ref.orderBy('fecha','desc').limit(15));
      return this.itemsCollection.valueChanges();
    }

    agregar_mensaje(texto:string){
      let mensaje:  Mensaje ={
        nombre:this.usuario.nombre,
        mensaje:texto,
        fecha:new Date().getTime(),
        uid:this.usuario.uid,

      }
      return this.itemsCollection.add(mensaje);
    }

  }
