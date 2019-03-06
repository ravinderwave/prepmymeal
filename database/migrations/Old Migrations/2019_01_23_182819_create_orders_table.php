<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->unsignedInteger('customer_id');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->integer('quantity')->nullable();
            $table->float('tax',8,2)->nullable();
            $table->float('amount',8,2)->nullable();
            $table->string('payment_mode')->nullable();
            $table->enum('status', ['0','1','2'])->comment('0=pending,1=paid,2=delivered')->default('0');
            $table->softDeletes();
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders',function(Blueprint $table){
            $table->dropForeign('orders_customer_id_foreign');
        });
    }
}
