<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateComponentDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('component_details', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('ingredients', 20)->nullable();
			$table->decimal('price_incl_7%_vat', 2, 1)->nullable();
			$table->integer('weight_raw')->nullable();
			$table->integer('weight_cooked')->nullable();
			$table->decimal('calorific_value_of_the_quantity', 16, 13)->nullable();
			$table->decimal('fat_of_the_crowd', 17, 15)->nullable();
			$table->decimal('of_which_saturated_fatty_acids_of_the_amount', 16, 15)->nullable();
			$table->decimal('carbohydrates_of_the_crowd', 17, 14)->nullable();
			$table->decimal('of_which_sugar_is_the_quantity', 15, 14)->nullable();
			$table->decimal('protein_of_the_crowd', 16, 14)->nullable();
			$table->decimal('salt_of_the_crowd', 16, 15)->nullable();
			$table->decimal('brennwert_100_g', 16, 13)->nullable();
			$table->decimal('fett_100_g', 16, 15)->nullable();
			$table->decimal('davon_gesattigte_fettsauren_100_g', 16, 15)->nullable();
			$table->decimal('kohlenhydrat_100_g', 16, 14)->nullable();
			$table->decimal('davon_Zucker 100g', 15, 14)->nullable();
			$table->decimal('eiweib_100g', 15, 14)->nullable();
			$table->decimal('salt_100g', 16, 15)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('component_details');
	}

}
