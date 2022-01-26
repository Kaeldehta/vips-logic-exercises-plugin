<div id="exercise-container" class="tailwind">
</div>

<script>
    const REACT_PROPS = {
        task: <?= json_encode($exercise->task) ?>,
        <? if ($response) : ?> response: <?= json_encode($response) ?>,
        <? endif ?>
    }
</script>

<script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/" . $exercise->type . "/" . $reactView . "/index.js" ?>"></script>
<link rel="stylesheet" href="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/" . $exercise->type . "/" . $reactView . "/index.css" ?>">