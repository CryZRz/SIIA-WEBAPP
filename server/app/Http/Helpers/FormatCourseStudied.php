<?php

namespace App\Http\Helpers;

use App\Http\Resources\CourseResource;

class FormatCourseStudied {

    public static function formatCourseStudied($listCourses){

        $listCoursesFormat = [];

        $getCoursesFailed = array_filter($listCourses, function($course){
            return $course["opportunity"] > 1;
        });


        if(count($getCoursesFailed) > 0){

            $getCoursesNotFailed = array_filter($listCourses, function($course){
                return $course["opportunity"] == 1;
            });

            foreach ($getCoursesNotFailed as $courseNotFailed) {

                $courseFormat = [
                    "id" => 0,
                    "subject" => "",
                    "credits" => 0,
                    "clave" => 0,
                    "ratings" => []
                ];

                $courseFormat["id"] =  $courseNotFailed["id"];
                $courseFormat["subject"] =  $courseNotFailed["course"]["subject"]["name"];
                $courseFormat["credits"] =  $courseNotFailed["course"]["subject"]["credits"];
                $courseFormat["clave"] =  $courseNotFailed["course"]["subject"]["id"];
                
                $courseFormat["ratings"][] =  [
                    "id" => $courseNotFailed["id"],
                    "course" => $courseNotFailed["course"],
                    "student" => $courseNotFailed["student"],
                    "finished" => $courseNotFailed["finished"],
                    "opportunity" => $courseNotFailed["opportunity"],
                    "createdAt" => $courseNotFailed["createdAt"],
                    "updatedAt" => $courseNotFailed["updatedAt"],
                    "qualification" => $courseNotFailed["qualification"],
                ];

                foreach ($getCoursesFailed as $courseFailed) {

                    if(
                        $courseFailed["course"]["subject"]["id"] === $courseFormat["clave"]
                        &&
                        $courseFailed["course"]["subject"]["name"] === $courseFormat["subject"]
                        ){
                        $courseFormat["ratings"][] =  [
                            "id" => $courseFailed["id"],
                            "course" => $courseFailed["course"],
                            "student" => $courseFailed["student"],
                            "finished" => $courseFailed["finished"],
                            "opportunity" => $courseFailed["opportunity"],
                            "createdAt" => $courseFailed["createdAt"],
                            "updatedAt" => $courseFailed["updatedAt"],
                            "qualification" => $courseFailed["qualification"],
                        ];
                    }
                }

                $listCoursesFormat[] = $courseFormat;
            }

        }else{

            foreach ($listCourses as $courseVoid) {

                $courseFormat = [
                    "id" => 0,
                    "subject" => "",
                    "credits" => 0,
                    "clave" => 0,
                    "ratings" => []
                ];

                $courseFormat["id"] =  $courseVoid["id"];
                $courseFormat["subject"] =  $courseVoid["course"]["subject"]["name"];
                $courseFormat["credits"] =  $courseVoid["course"]["subject"]["credits"];
                $courseFormat["clave"] =  $courseVoid["course"]["subject"]["id"];

                $courseFormat["ratings"][] =  [
                    "id" => $courseVoid["id"],
                    "course" => $courseVoid["course"],
                    "student" => $courseVoid["student"],
                    "finished" => $courseVoid["finished"],
                    "opportunity" => $courseVoid["opportunity"],
                    "createdAt" => $courseVoid["createdAt"],
                    "updatedAt" => $courseVoid["updatedAt"],
                    "qualification" => $courseVoid["qualification"],
                ];

                $listCoursesFormat[] = $courseFormat;
            }

        }

        return $listCoursesFormat;
    }

}