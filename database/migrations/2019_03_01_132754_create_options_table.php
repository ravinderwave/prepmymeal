<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOptionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('options', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('email')->nullable();
			$table->string('phone')->nullable();
			$table->string('facebook')->nullable();
			$table->string('twitter')->nullable();
			$table->string('linkedin')->nullable();
			$table->string('googlePlus')->nullable();
			$table->string('youtube')->nullable();
			$table->string('instagram')->nullable();
			$table->string('flickr')->nullable();
			$table->string('vimeo')->nullable();
			$table->string('telegram')->nullable();
			$table->text('verifyTag', 16777215)->nullable();
			$table->text('googleAnalytics', 16777215)->nullable();
			$table->text('chatLink', 16777215)->nullable();
			$table->softDeletes();
			$table->timestamps();
			$table->string('shipping_tax')->nullable();
			$table->string('vat_tax')->nullable();
			$table->string('ups_email')->nullable();
			$table->string('kitchen_email')->nullable();
			$table->string('marketing_email')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('options');
	}

}
