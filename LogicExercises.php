<?php
/*
 * Wertetabelle.php - Vips plugin class for Stud.IP
 * Copyright (c) 2020  Elmar Ludwig
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of
 * the License, or (at your option) any later version.
 */

class LogicExercises extends StudIPPlugin implements SystemPlugin
{
    public function __construct()
    {
        parent::__construct();

        if (class_exists('Exercise')) {
            StudipAutoloader::addClassLookup('st_exercise', __DIR__ . '/st_exercise.php');
            Exercise::addExerciseType('Semantic Tree', 'st_exercise', 'semantic-tree');

            StudipAutoloader::addClassLookup('fc_exercise', __DIR__ . '/fc_exercise.php');
            Exercise::addExerciseType('Fitch-style Syntactic Proof', 'fc_exercise', 'fc-proof');
        }
    }
}
