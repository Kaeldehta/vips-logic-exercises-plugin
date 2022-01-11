<?php

abstract class ReactExercise extends Exercise {

    public function getTemplate($view, $props) {
        $templatefactory = new Flexi_TemplateFactory(__DIR__ . '/templates');
        $template = $templatefactory->open('index');
        $template->view = $view;
        $template->props = $props;
        $template->exercise_type = get_class($this);

        return $template;
    }

    public function getEditTemplate($assignment)
    {
        $props = $this->task;
        
        $template = $this->getTemplate("edit", $props);

        return $template;
    }

    public function getViewTemplate($view, $solution, $assignment, $user_id)
    {
        $props = $this->task;
        
        if ($solution) {
            $props["solution"] = $solution->response;
            //$template->results = $this->evaluateItems($solution);
        }

        $template = $this->getTemplate($view, $props);

        return $template;
    }

}

?>