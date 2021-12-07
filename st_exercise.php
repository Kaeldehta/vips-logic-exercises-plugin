<?php

class st_exercise extends Exercise
{

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $this->task["answers"] = [0 => [
            "consequence" => $request["sem_cons"]
        ]];
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
        $template->exercise_type = $this->getTypeName();

        return $template;
    }

    public function getEditTemplate($assignment)
    {

        $props = $this->task["answers"][0];
        
        $template = $this->getTemplate("edit", $props);

        return $template;
    }

    public function getViewTemplate($view, $solution, $assignment, $user_id)
    {
        $template = $this->getTemplate($view, ["foo" => "bar"]);

        if ($solution) {
            $template->response = $solution->response;
            $template->results = $this->evaluateItems($solution);
        }

        return $template;
    }
}
