<div id="exercise-container" class="tailwind" data-view=<?= $reactView ?> <? if ($exercise->task["answers"][0]) : ?> data-task=<?= json_encode($exercise->task["answers"][0]) ?><? endif ?> <? if ($response) : ?> data-response=<?= json_encode($response) ?><? endif ?>>
</div>

<script type="module">
    import RefreshRuntime from 'http://localhost:3000/@react-refresh'
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
</script>

<script type="module" src="http://localhost:3000/main.js"></script>

<!-- <script src="<?= PluginEngine::getPlugin("LogicExercises")->getPluginURL() . "/dist/" . json_decode(file_get_contents("../dist/manifest.json"))["src/main.tsx"]["file"] ?>"></script> -->