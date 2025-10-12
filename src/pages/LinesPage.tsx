import type { LineInterface } from "../interfaces/LinesInterface";
import { getLines } from "../api/line";
import { useState, useEffect } from "react";

const LinesPage = () => {
  const [lines, setLines] = useState<LineInterface[]>([]);

  useEffect(() => {
    (async () => {
      setLines(await getLines());
    })();
  }, []);

  return <div></div>;
};

export default LinesPage;
