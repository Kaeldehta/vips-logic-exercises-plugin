<div id="exercise-container">
</div>

<script>
    const REACT_PROPS = <?= json_encode($props) ?>
</script>

<script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/" . $exercise_type . "/" . $view . ".js" ?>"></script>
<link rel="stylesheet" href="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/" . $exercise_type . "/" . $view . ".css" ?>">