<div id="exercise-container" class="tailwind" data-type=<?= $exercise->type ?> data-view=<?= $reactView ?> <? if ($exercise->task["answers"][0]) : ?> data-answer=<?= json_encode($exercise->task["answers"][0]) ?><? endif ?> <? if ($response) : ?> data-response=<?= json_encode($response) ?><? endif ?>>
</div>

<script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/index.js" ?>"></script>