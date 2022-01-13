<?php

abstract class LogicExercise extends Exercise {

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $this->task = [
            "consequence" => $request["consequence"],
            "statements" => $request["statements"] ?? [],
            "include_predicates" => $request["include_predicates"]
        ];
    }

    public function evaluateItems($solution)
    {
        return [["points" => 0, "safe" => false]];
    }

    public function getTemplate($view) {
        $templatefactory = new Flexi_TemplateFactory(__DIR__ . '/templates');
        $template = $templatefactory->open('index');
        $template->reactView = $view;
        $template->exercise = $this;
        return $template;
    }

    public function getEditTemplate($assignment)
    {
        return $this->getTemplate("edit");
    }

    public function getViewTemplate($view, $solution, $assignment, $user_id)
    {
        $template = $this->getTemplate($view);

        if ($solution) {
            $template->response = $solution->response;
            $template->results = $this->evaluateItems($solution);
        }

        return $template;
    }
    
}

?>