<?php

abstract class LogicExercise extends Exercise
{

    public function responseFromRequest($request)
    {
        return json_decode($request["response"], true);
    }

    public function initFromRequest($request)
    {
        parent::initFromRequest($request);

        $answer = json_decode($request["answer"], true);

        $consequence = $answer["consequence"];
        $statements = $answer["statements"];

        $predicateLogic = false;

        if (preg_match("/[\x{2200}\x{2003}abcFGHxyz]/u", $consequence)) {
            $predicateLogic = true;
        }

        // foreach ($statements["entries"] as $statement) {
        //     if (preg_match("/[\x{2200}\x{2003}abcFGHxyz]/u", $statement)) {
        //         $predicateLogic = true;
        //     }
        // }

        $this->task = [
            "answers" => [
                0 => [
                    "consequence" => $consequence,
                    "statements" => $statements,
                    "predicateLogic" => $predicateLogic
                ]
            ]
        ];
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
