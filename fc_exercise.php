<?php

class fc_exercise extends Exercise
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

    public function getTemplate($view, $props) {
        $templatefactory = new Flexi_TemplateFactory(__DIR__ . '/templates');
        $template = $templatefactory->open('index');
        $template->view = $view;
        $template->props = $props;
        $template->exercise_type = __CLASS__;

        return $template;
    }

    public function responseFromRequest($request)
    {
        $lines = $request["lines"];
        foreach ($lines as $key => $value) {
            if($lines[$key]["line"]["line1"]) {
                $lines[$key]["line"]["line1"] = intval($value["line"]["line1"]);
            }

            if($lines[$key]["line"]["line2"]) {
                $lines[$key]["line"]["line2"] = intval($value["line"]["line2"]);
            }

            $lines[$key]["indentationLevel"] = intval($value["indentationLevel"]);
        }

        return ["lines" => $lines];
    }

    public function getEditTemplate($assignment)
    {
        $props = $this->task;
        
        $template = $this->getTemplate("edit", $props);

        return $template;
    }


    public function getViewTemplate($view, $solution, $assignment, $user_id)
    {
        $props = [
            "consequence" => $this->task["consequence"],
            "statements" => $this->task["statements"],
        ];
        

        if ($solution) {
            $response = $solution->response;
            $props["lines"] = $response["lines"];
            //$template->results = $this->evaluateItems($solution);
        }

        $template = $this->getTemplate($view, $props);

        return $template;
    }
}
