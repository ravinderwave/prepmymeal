<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMetasToMeals extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('meals', function (Blueprint $table) {
            $table->string('mtitle')->nullable()->after('status');
            $table->mediumText('mdesc')->nullable()->after('mtitle');
            $table->string('mkey')->nullable()->after('mdesc');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('meals', function (Blueprint $table) {
            $table->dropColumn('mtitle');
            $table->dropColumn('mdesc');
            $table->dropColumn('mkey');
        });
    }
}
