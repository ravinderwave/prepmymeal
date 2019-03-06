<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('old_order_id')->default(0);
			$table->string('email', 100)->nullable();
			$table->integer('customer_id')->unsigned()->index('orders_customer_id_foreign');
			$table->integer('address_id')->unsigned()->index('orders_address_id_foreign');
			$table->float('tax')->nullable();
			$table->float('sub_total')->nullable();
			$table->string('payment_mode')->nullable();
			$table->enum('status', array('0','1','2'))->default('0')->comment('0=pending,1=paid,2=delivered');
			$table->softDeletes();
			$table->timestamps();
			$table->string('txn_id', 50)->nullable()->unique('orders_txn_id_uindex');
			$table->decimal('shipping', 10)->nullable();
			$table->decimal('order_total', 10)->nullable();
			$table->text('recurring', 65535)->nullable();
			$table->integer('rinterval')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('orders');
	}

}
