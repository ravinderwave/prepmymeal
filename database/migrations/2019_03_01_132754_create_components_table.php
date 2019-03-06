<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateComponentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('components', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title')->nullable();
			$table->string('weight')->nullable();
			$table->enum('type', array('0','1'))->default('0')->comment('0=main,1=additional');
			$table->text('ntr_options', 16777215)->nullable();
			$table->string('price')->nullable();
			$table->string('image')->nullable();
			$table->enum('status', array('0','1'))->default('1')->comment('1=active,0=deactive');
			$table->softDeletes();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('components');
	}

}
