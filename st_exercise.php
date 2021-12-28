<?php

class st_exercise extends Exercise
{

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $this->task = [
            "consequence" => $request["consequence"],
            "statements" => $request["statements"] ?? [],
            "holds" => (bool) $request["holds"],
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
        $result = $request["root"];

        return $result;
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
            $props["root"] = $solution->response;
            //$template->results = $this->evaluateItems($solution);
        }

        $template = $this->getTemplate($view, $props);

        return $template;
    }
}
