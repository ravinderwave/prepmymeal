<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meals', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('title');
            $table->string('slug');
            $table->mediumText('description')->nullable();
            $table->mediumText('short_description')->nullable();
            $table->string('sku')->nullable();
            $table->string('price')->nullable();
            $table->enum('is_sale', ['0', '1'])->default('0');
            $table->string('discount_percentage')->nullable();
            $table->string('quantity')->nullable();
            $table->enum('type', ['0', '1'])->comment('0=normal,1=meal_box')->default('0');
            $table->mediumText('meal_options')->nullable();
            $table->string('image1')->nullable();
            $table->string('image2')->nullable();
            $table->enum('status', ['0', '1'])->comment('1=active,0=deactive')->default('1');
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
        Schema::dropIfExists('meals');
    }
}
