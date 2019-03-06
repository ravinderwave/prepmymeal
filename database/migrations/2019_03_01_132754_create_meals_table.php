<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMealsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('meals', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('title');
			$table->string('slug');
			$table->text('description', 16777215)->nullable();
			$table->text('short_description', 16777215)->nullable();
			$table->string('sku')->nullable();
			$table->string('price')->nullable();
			$table->enum('is_sale', array('0','1'))->default('0');
			$table->string('discount_percentage')->nullable();
			$table->string('quantity')->nullable();
			$table->enum('type', array('0','1'))->default('0')->comment('0=normal,1=meal_box');
			$table->text('meal_options', 16777215)->nullable();
			$table->text('ntr_options', 16777215)->nullable();
			$table->string('image1')->nullable();
			$table->string('image2')->nullable();
			$table->enum('status', array('0','1'))->default('1')->comment('1=active,0=deactive');
			$table->string('mtitle')->nullable();
			$table->text('mdesc', 16777215)->nullable();
			$table->string('mkey')->nullable();
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
		Schema::drop('meals');
	}

}
