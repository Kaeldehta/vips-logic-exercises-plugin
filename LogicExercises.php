<?php

class LogicExercises extends StudIPPlugin implements SystemPlugin
{
    public function __construct()
    {
        parent::__construct();

        if (class_exists('Exercise')) {
            StudipAutoloader::addClassLookup('logic_exercise', __DIR__ . '/logic_exercise.php');
            Exercise::addExerciseType('Logic Exercise', 'logic_exercise', 'logic-exercise');
        }
    }
}
