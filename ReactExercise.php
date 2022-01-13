<?php

abstract class ReactExercise extends Exercise {

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

        $template->solution = $solution;
        $template->response = $solution->response;

        return $template;
    }
    
}

?>