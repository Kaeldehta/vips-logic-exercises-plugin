<?php

class st_exercise extends LogicExercise
{

    public function responseFromRequest($request)
    {
        $result = $request["root"];

        return $result;
    }
    
}
