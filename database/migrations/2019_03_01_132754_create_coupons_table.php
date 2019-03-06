<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCouponsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('coupons', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('username')->nullable();
			$table->string('code')->nullable();
			$table->string('discount')->nullable();
			$table->string('discount_type')->nullable();
			$table->string('valid_till')->nullable();
			$table->string('usage_count')->nullable();
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
		Schema::drop('coupons');
	}

}
