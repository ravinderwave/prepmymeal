<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMealslistTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mealslist', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('name', 20)->nullable();
			$table->decimal('price_incl_vat', 3, 1)->nullable();
			$table->string('meal_1', 3)->nullable();
			$table->string('meal_2', 3)->nullable();
			$table->string('meal_3', 3)->nullable();
			$table->string('meal_4', 3)->nullable();
			$table->string('meal_5', 3)->nullable();
			$table->string('meal_6', 3)->nullable();
			$table->string('meal_7', 3)->nullable();
			$table->string('meal_8', 3)->nullable();
			$table->string('meal_9', 3)->nullable();
			$table->string('meal_10', 3)->nullable();
			$table->string('meal_11', 3)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('mealslist');
	}

}
