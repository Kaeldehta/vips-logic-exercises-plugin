<div id="exercise-container" class="tailwind" data-type=<?= $exercise->type ?> data-view=<?= $reactView ?> data-task=<?= json_encode($exercise->task) ?> <? if ($response) : ?> data-response=<?= json_encode($response) ?><? endif ?>>
</div>

<script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/index.js" ?>"></script>