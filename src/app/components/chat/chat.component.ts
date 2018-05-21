import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../providers/chat.service";
import {Mensaje} from "../../interface/mensaje.interface";
import { Observable } from 'rxjs';
export interface Item { mensaje: string; }
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
 mensaje: string="";
 chats:Mensaje[]=[];
 elemento:any;
  constructor( public _cs:ChatService) {
    this._cs.cargar_mensajes().subscribe(
      (mensajes:Mensaje[])=>{
        setTimeout(()=>{
          this.elemento.scrollTop = this.elemento.scrollHeight;
        },25);

      this.chats=mensajes;
      this.chats.reverse();

    });
   }

  ngOnInit() {
    this.elemento=document.getElementById('app-mensajes');
  }

  enviar_mensaje(){

    if(this.mensaje.length==0){
      return;
    }

    this._cs.agregar_mensaje(this.mensaje).then(()=>{
      console.log("Tu mensaje ha sido agregado");
      this.mensaje="";
    }).catch((err)=>{
      console.error("Hubo un problema en la carga",err);
    });
  }

}
