<?php

class fc_exercise extends LogicExercise
{

    public function responseFromRequest($request)
    {
        $lines = $request["lines"];
        foreach ($lines as &$value) {
            if(isset($value["line"]["from"]["line1"])) {
                $value["line"]["from"]["line1"] = intval($value["line"]["from"]["line1"]);
            }

            if(isset($value["line"]["from"]["line2"])) {
                $value["line"]["from"]["line2"] = intval($value["line"]["from"]["line2"]);
            }

            if(isset($value["line"]["from"]["line"])) {
                $value["line"]["from"]["line"] = intval($value["line"]["from"]["line"]);
            }

            if(isset($value["line"]["from"]["assumption1"])) {
                $value["line"]["from"]["assumption1"] = intval($value["line"]["from"]["assumption1"]);
            }

            if(isset($value["line"]["from"]["assumption2"])) {
                $value["line"]["from"]["assumption2"] = intval($value["line"]["from"]["assumption2"]);
            }

            $value["indentationLevel"] = intval($value["indentationLevel"]);
        }

        return ["lines" => $lines];
    }
}
