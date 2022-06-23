<?php

class logic_exercise extends Exercise
{

    public function responseFromRequest($request)
    {
        return $request["response"];
    }

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $task = $request["task"];


        if($task["type"] == "tree" | $task["type"] == "fitch") {

            function containsPredicate($element) {
                return preg_match("/[abcFGHxyzue=]/", $element);
            }

            $predicate = false;

            foreach ($task["statements"] as $value) {
                if(containsPredicate($value["statement"])) {
                    $predicate = true;
                    break;
                }
            }

            $task["predicate"] = $predicate || containsPredicate($task["consequence"]);
        }


        $this->task["answers"][0] = $task;
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
        $template->basePath = PluginEngine::getPlugin("LogicExercises")->getPluginURL();

        $manifestPath = __DIR__ . '/manifest.json';

        if(file_exists($manifestPath)) {
            $manifest = json_decode(file_get_contents($manifestPath), true);
            $template->jsEntry = $manifest["src/main.tsx"]["file"];
            $template->cssEntry = $manifest["src/main.tsx"]["css"][0];
        }

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
