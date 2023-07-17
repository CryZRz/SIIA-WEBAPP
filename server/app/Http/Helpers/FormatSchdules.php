<?php

namespace App\Http\Helpers;

class FormatSchdules {
    public static function formatSchedule($listSchedules){

        $listSchedulesFormat = [];

        foreach($listSchedules as $liSchedule){
            
            $schedulesFormat = [
                "day" => "",
                "hours" => []
            ];

            foreach ($liSchedule as $schedule) {
                $schedulesFormat["day"] = $schedule->day;
                $schedulesFormat["hours"][] = [
                    "startTime" => $schedule->start_time,
                    "endTime" => $schedule->end_time,
                    "course" => [
                        "id" => $schedule->course_id
                    ],
                    "id" => $schedule->id
                ];
            }

            $listSchedulesFormat[] = $schedulesFormat;
        }

        return $listSchedulesFormat;
    } 
}