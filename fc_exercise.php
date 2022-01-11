<?php

class fc_exercise extends ReactExercise
{

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $this->task = [
            "consequence" => $request["consequence"],
            "statements" => $request["statements"] ?? []
        ];
    }

    public function evaluateItems($solution)
    {
        return [];
    }

    public function responseFromRequest($request)
    {
        $lines = $request["lines"];
        foreach ($lines as $key => $value) {
            if($lines[$key]["line"]["from"]["line1"]) {
                $lines[$key]["line"]["from"]["line1"] = intval($value["line"]["from"]["line1"]);
            }

            if($lines[$key]["line"]["from"]["line2"]) {
                $lines[$key]["line"]["from"]["line2"] = intval($value["line"]["from"]["line2"]);
            }

            if($lines[$key]["line"]["from"]["line"]) {
                $lines[$key]["line"]["from"]["line"] = intval($value["line"]["from"]["line"]);
            }

            $lines[$key]["indentationLevel"] = intval($value["indentationLevel"]);
        }

        return ["lines" => $lines];
    }
}
