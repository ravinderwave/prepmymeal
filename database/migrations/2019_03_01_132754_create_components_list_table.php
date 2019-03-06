<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateComponentsListTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('components_list', function(Blueprint $table)
		{
			$table->integer('id')->nullable();
			$table->string('name', 40)->nullable();
			$table->integer('components_1')->nullable();
			$table->integer('components_2')->nullable();
			$table->integer('components_3')->nullable();
			$table->integer('components_4')->nullable();
			$table->string('properties_with_sauce', 30)->nullable();
			$table->string('properties_without_sauce', 37)->nullable();
			$table->string('main_category', 12)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('components_list');
	}

}
