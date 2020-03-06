import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  constructor(private modalController: ModalController) {}

  // Variables pasadas desde la pagina anterior
  @Input() public idLugar: string;
  @Input() public nombreLugar: string;
  @Input() public fotoLugar: string;
  @Input() public puntuacionLugar: string;
  @Input() public tipoLugar: string;

  ngOnInit() {
  }

  // Funcion para cerrar modal
  async closeModal() {
    await this.modalController.dismiss();

  }

}
