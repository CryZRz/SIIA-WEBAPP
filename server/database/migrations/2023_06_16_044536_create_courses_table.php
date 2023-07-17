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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId("subject_id")->constrained()->onDelete("cascade");
            $table->foreignId("teacher_id")->nullable()->constrained("users")->onDelete("cascade");
            $table->foreignId("team_id")->constrained()->onDelete("cascade");
            $table->foreignId("period_id")->constrained()->onDelete("cascade");
            $table->string("type_of_group");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
