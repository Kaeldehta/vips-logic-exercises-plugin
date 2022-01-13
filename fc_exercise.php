<?php

class fc_exercise extends LogicExercise
{

    public function responseFromRequest($request)
    {
        $lines = $request["lines"];
        foreach ($lines as $key => $value) {
            if(isset($lines[$key]["line"]["from"]["line1"])) {
                $lines[$key]["line"]["from"]["line1"] = intval($value["line"]["from"]["line1"]);
            }

            if(isset($lines[$key]["line"]["from"]["line2"])) {
                $lines[$key]["line"]["from"]["line2"] = intval($value["line"]["from"]["line2"]);
            }

            if(isset($lines[$key]["line"]["from"]["line"])) {
                $lines[$key]["line"]["from"]["line"] = intval($value["line"]["from"]["line"]);
            }

            if(isset($lines[$key]["line"]["from"]["assumption1"])) {
                $lines[$key]["line"]["from"]["assumption1"] = intval($value["line"]["from"]["assumption1"]);
            }

            if(isset($lines[$key]["line"]["from"]["assumption2"])) {
                $lines[$key]["line"]["from"]["assumption2"] = intval($value["line"]["from"]["assumption2"]);
            }

            $lines[$key]["indentationLevel"] = intval($value["indentationLevel"]);
        }

        return ["lines" => $lines];
    }
}
