<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTransactionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transaction', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('paymentId', 50)->unique('transaction_txn_id_uindex');
			$table->text('txn_data');
			$table->string('status', 50)->nullable();
			$table->timestamps();
			$table->integer('customer_id')->nullable();
			$table->text('txn_response')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('transaction');
	}

}
