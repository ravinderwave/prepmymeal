<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSauceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sauce', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('name', 20)->nullable();
			$table->string('Ingredients', 58)->nullable();
			$table->string('weight_raw in ml or g', 2)->nullable();
			$table->string('weight_cooked in ml or g', 2)->nullable();
			$table->string('calorific_value_kcal', 16)->nullable();
			$table->string('fett_in_g', 17)->nullable();
			$table->string('of_which_saturated_fatty_acids_in_g', 17)->nullable();
			$table->string('carbohydrates_in_g', 16)->nullable();
			$table->string('of_which_sugar_**_in_g', 16)->nullable();
			$table->string('egg_white_in_g', 16)->nullable();
			$table->string('salt_in_g', 17)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('sauce');
	}

}
