<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFormulasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('formulas', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('component_id')->nullable()->default(0);
			$table->string('name', 50);
			$table->string('measure_type', 50);
			$table->string('measure', 50);
			$table->enum('type', array('sauce','item'));
			$table->timestamps();
			$table->softDeletes();
			$table->string('sub_component', 50)->nullable()->default('0');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('formulas');
	}

}
