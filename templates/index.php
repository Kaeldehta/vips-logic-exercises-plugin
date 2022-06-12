<div id="exercise-container" class="tailwind" data-view=<?= $reactView ?> <? if ($exercise->task["answers"][0]) : ?> data-task=<?= json_encode($exercise->task["answers"][0]) ?> data-type=<?= $exercise->task["answers"][0]["type"] ?> <? endif ?> <? if ($response) : ?> data-response=<?= json_encode($response) ?><? endif ?>>
</div>

<script type="module" src="http://localhost:3000/src/main.tsx"></script>
