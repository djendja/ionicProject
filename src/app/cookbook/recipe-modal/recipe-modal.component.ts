import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss'],
})
export class RecipeModalComponent implements OnInit {

  @ViewChild('f',{static: true}) form: NgForm;
  @Input() title: string;

  constructor(private modalCtrl: ModalController, private recipesService: RecipesService) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddRecipe() {
    if(!this.form.valid) {
      return;
    }
    this.recipesService.addRecipe({id:'', title: this.form.value['title'], text: this.form.value['text'], imageUrl: ''})
    this.modalCtrl.dismiss({quoteData: {title: this.form.value['title'], text: this.form.value['text']}},'confirm');
  }
}
