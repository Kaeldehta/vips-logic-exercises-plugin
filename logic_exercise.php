<?php

class logic_exercise extends Exercise
{

    public function responseFromRequest($request)
    {
        return json_decode($request["react_form_values"], true);
    }

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $answer = json_decode($request["react_form_values"]);

        $this->task["answers"][0] = $answer;
    }

    public function evaluateItems($solution)
    {
        return [["points" => 0, "safe" => false]];
    }

    public function getTemplate($view)
    {
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
