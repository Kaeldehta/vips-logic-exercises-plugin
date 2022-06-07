import { replaceInFile } from "replace-in-file";
import { copy, readFile, createWriteStream } from "fs-extra";
import * as archiver from "archiver";

const run = async () => {
  await copy("templates/index.php", "dist/templates/index.php");

  const result = await readFile("templates/prod.php");

  await replaceInFile({
    files: ["dist/templates/index.php"],
    from: /<!--SCRIPT-->.*<!--END_SCRIPT-->/s,
    to: result.toString(),
  });

  const output = createWriteStream("package.zip");

  const archive = archiver("zip");

  archive.pipe(output);

  archive.directory("dist/", false);
  archive.file("plugin.manifest", { name: "plugin.manifest" });
  archive.file("logic_exercise.php", { name: "logic_exercise.php" });
  archive.file("LogicExercises.php", { name: "LogicExercises.php" });

  await archive.finalize();
};

run();
