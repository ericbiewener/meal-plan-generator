import _ from "lodash";
import { emojis } from "./emojis";
import { FC, useMemo } from "react";
import { Textfit } from "react-textfit";

type Props = { reRenderCount?: unknown };

export const EmojiHeader: FC<Props> = ({ reRenderCount }) => {
  const shuffledEmojis = useMemo(() => _.shuffle(emojis), [reRenderCount]);
  return (
    <Textfit mode="single">
      <div className="flex justify-between">
        {shuffledEmojis.slice(0, 5).map((e) => (
          <span key={e}>{e}</span>
        ))}
      </div>
    </Textfit>
  );
};
