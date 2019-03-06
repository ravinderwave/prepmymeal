<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIngredientsWithFieldsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ingredients_with_fields', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('name', 20)->nullable();
			$table->string('ingredients', 58)->nullable();
			$table->string('Feld3')->nullable();
			$table->string('Feld4')->nullable();
			$table->string('Feld5')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ingredients_with_fields');
	}

}
