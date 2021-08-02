import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  recipe: Recipe;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.router.navigate(['/recipes']);
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.recipe = this.recipeService.getRecipe(recipeId);
    });
  }

  onDeleteReciipe() {
    if (this.recipe && this.recipe.id) {
      this.alertCtrl.create({
        header: "Delete confirmation",
        message: "Are you sure to want to delete the recipe?",
        buttons: [{
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: "Delete",
          handler: () => {
            this.recipeService.deleteRecipe(this.recipe.id);
            this.router.navigate(['/recipes']);
          }
        }
        ]
      }).then(alertE1 => {
        alertE1.present();
      })
    }
  }
  ionViewWillEnter() {
    console.log("ion view will enter details");
  }
  ionViewDidEnter() {
    console.log("ion view did enter details");
  }
  ionViewWillLeave() {
    console.log("ion view will leave details");
  }
  ionViewDidLeave() {
    console.log("ion view did leave details");
  }
  ngOnDestroy() {
    console.log("on destroy details");
  }

}
