import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
})
export class RecipeModalComponent implements OnInit {

  @ViewChild('f',{static: true}) form: NgForm;
  @Input() title: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddQuote() {
    if(!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss({quoteData: {author: this.form.value['author'], text: this.form.value['text']}},'confirm');
  }
}
