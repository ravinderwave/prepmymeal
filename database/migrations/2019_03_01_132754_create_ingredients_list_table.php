<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIngredientsListTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ingredients_list', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('ingredients', 13)->nullable();
			$table->decimal('price_incl_7%_vat', 2, 1)->nullable();
			$table->integer('Weight raw')->nullable();
			$table->integer('weight_cooked')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ingredients_list');
	}

}
