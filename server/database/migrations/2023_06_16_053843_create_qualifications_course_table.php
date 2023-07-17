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
        Schema::create('qualifications_course', function (Blueprint $table) {
            $table->id();
            $table->string("qualification")->nullable();
            $table->string("status");
            $table->foreignId("course_studied_id")->constrained("courses_studied")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qualifications_course');
    }
};
