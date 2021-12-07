<?php

class st_exercise extends Exercise
{

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
        
        $template = $this->getTemplate("edit", ["test" => "Hello"]);

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
