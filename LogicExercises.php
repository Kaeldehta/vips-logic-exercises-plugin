<?php

class LogicExercises extends StudIPPlugin implements SystemPlugin
{
    public function __construct()
    {
        parent::__construct();

        if (class_exists('Exercise')) {
            StudipAutoloader::addClassLookup('LogicExercise', __DIR__ . '/LogicExercise.php');
            StudipAutoloader::addClassLookup('st_exercise', __DIR__ . '/st_exercise.php');
            Exercise::addExerciseType('Semantic Tree', 'st_exercise', 'semantic-tree');

            StudipAutoloader::addClassLookup('fc_exercise', __DIR__ . '/fc_exercise.php');
            Exercise::addExerciseType('Fitch-style Syntactic Proof', 'fc_exercise', 'fc-proof');
        }
    }
}
