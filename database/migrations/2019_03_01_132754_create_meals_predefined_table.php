<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMealsPredefinedTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('meals_predefined', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('name', 40)->nullable();
			$table->integer('sauce_id')->nullable();
			$table->string('properties_with_sauce', 30)->nullable();
			$table->string('properties_without_sauce', 37)->nullable();
			$table->string('main_category', 12)->nullable();
			$table->decimal('price_in_eur_incl_7%_vat', 3, 1)->nullable();
			$table->integer('weight_raw')->nullable();
			$table->integer('weight_cooked')->nullable();
			$table->decimal('calorific_value_kcal', 6, 3)->nullable();
			$table->decimal('Fett in g', 4)->nullable();
			$table->decimal('of_which_saturated_fatty_acids_in_g', 5, 3)->nullable();
			$table->decimal('carbohydrates_in_g', 4, 1)->nullable();
			$table->decimal('of_which_sugar_**_in_g', 4)->nullable();
			$table->decimal('egg_white_in_g', 4)->nullable();
			$table->decimal('salt_in_g', 3)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('meals_predefined');
	}

}
