<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCustomersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('customers', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name')->nullable();
			$table->string('username', 150);
			$table->string('email', 150)->unique();
			$table->string('password')->nullable();
			$table->string('phone')->nullable();
			$table->string('email_verified_at')->nullable();
			$table->string('remember_token', 100)->nullable();
			$table->enum('status', array('0','1'))->default('1')->comment('1=active,0=deactive');
			$table->string('stripe_id')->nullable();
			$table->string('card_brand', 100)->nullable();
			$table->string('card_last_four', 10)->nullable();
			$table->dateTime('trial_ends_at')->nullable();
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
		Schema::drop('customers');
	}

}
