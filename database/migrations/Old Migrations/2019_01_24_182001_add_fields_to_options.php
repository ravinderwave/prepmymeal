<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToOptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('options', function (Blueprint $table) {
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
        Schema::table('options', function (Blueprint $table) {
            $table->dropColumn('shipping_tax');
            $table->dropColumn('vat_tax');
            $table->dropColumn('ups_email');
            $table->dropColumn('kitchen_email');
            $table->dropColumn('marketing_email');
        });
    }
}
