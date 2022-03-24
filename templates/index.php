<div id="exercise-container" class="tailwind" data-view=<?= $reactView ?> <? if ($exercise->task["answers"][0]) : ?> data-task=<?= json_encode($exercise->task["answers"][0]) ?><? endif ?> <? if ($response) : ?> data-solution=<?= json_encode($response) ?><? endif ?>>
</div>

<script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/index.js" ?>"></script>