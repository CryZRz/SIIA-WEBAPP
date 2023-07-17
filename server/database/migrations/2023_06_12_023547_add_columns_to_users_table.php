<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string("last_name");
            $table->string("direction");
            $table->foreignId("team_id")->nullable()->constrained()->onDelete("cascade");
            $table->foreignId("semester_id")->nullable()->constrained()->onDelete("cascade");
            $table->foreignId("educational_plan_id")->nullable()->constrained()->onDelete("cascade");
            $table->foreignId("role_id")->constrained()->onDelete("cascade");
            $table->string("image");
            $table->foreignId("profile_id")->constrained()->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign("users_educational_plan_id_foreign");
            $table->dropForeign("users_profile_id_foreign");
            $table->dropForeign("users_role_id_foreign");
            $table->dropForeign("users_team_id_foreign");
            $table->dropForeign("users_semester_id_foreign");

            $table->dropColumn("last_name");
            $table->dropColumn("direction");
            $table->dropColumn("team_id");
            $table->dropColumn("semester_id");
            $table->dropColumn("educational_plan_id");
            $table->dropColumn("role_id");
            $table->dropColumn("imagen");
            $table->dropColumn("profile_id");
        });
    }
};
