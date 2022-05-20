import _ from "lodash";
import { emojis } from "./emojis";
import { FC, useMemo } from "react";

type Props = { reRenderCount?: unknown };

export const EmojiHeader: FC<Props> = ({ reRenderCount }) => {
  const shuffledEmojis = useMemo(() => _.shuffle(emojis), [reRenderCount]);
  return (
    <div className="flex justify-between" style={{ fontSize: "9rem"}}>
      {shuffledEmojis.slice(0, 5).map((e) => (
        <span key={e}>{e}</span>
      ))}
    </div>
  );
};
