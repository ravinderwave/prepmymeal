<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBoxesPredefinedTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('boxes_predefined', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('name', 20)->nullable();
			$table->decimal('price_incl_vat', 3, 1)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('boxes_predefined');
	}

}
