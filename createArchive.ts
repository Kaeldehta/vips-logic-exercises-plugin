import { createWriteStream } from "fs-extra";
import archiver from "archiver";
const run = async () => {

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
