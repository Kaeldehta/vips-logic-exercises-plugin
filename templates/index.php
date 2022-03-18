<div id="exercise-container" class="tailwind" data-view=<?= $reactView ?> <? if ($exercise->task) : ?> data-task=<?= json_encode($exercise->task) ?><? endif ?> <? if ($response) : ?> data-solution=<?= json_encode($response) ?><? endif ?>>
</div>

<script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/index.js" ?>"></script>