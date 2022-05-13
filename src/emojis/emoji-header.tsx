import _ from "lodash";
import { getEmojis } from "./get-emojis";

export const EmojiHeader = () => {
  const emojis = _.shuffle(getEmojis());
  return (
    <div className="emoji-header">
      {emojis.slice(0, 5).map((e) => (
        <span key={e}>{e}</span>
      ))}
    </div>
  );
};
