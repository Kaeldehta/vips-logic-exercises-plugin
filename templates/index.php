<div id="exercise-container" class="tailwind">
</div>

<script>
  const RESPONSE = <? if ($response) :?> <?= json_encode($response, JSON_NUMERIC_CHECK) ?> <? else: ?> undefined  <? endif ?>;
  const TASK = <? if ($exercise->task["answers"][0]) : ?><?= json_encode($exercise->task["answers"][0]) ?> <? else: ?> undefined <? endif ?>;
  const VIEW = "<?= $reactView ?>";
  const TASK_TYPE = <? if ($exercise->task["answers"][0]) : ?>"<?= $exercise->task["answers"][0]["type"] ?>" <? else: ?> undefined <? endif ?>;
  window.__toCompleteUrl = function(filename) {
    return "<?= $basePath ?>" + "/" + filename;
  }
</script>

<script type="module" src="http://localhost:3000/src/main.tsx"></script>