<?php

class st_exercise extends LogicExercise
{

    public function responseFromRequest($request)
    {
        $result = ["root" => $request["root"]];

        return $result;
    }
}
