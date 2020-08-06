import formatDate from "date-fns/format";
import React from "react";
import { Notes } from "../storage/DatabaseSchema";

export interface ReviewNotesProps {
  notes: Notes;
}

export const ReviewNotes: React.FunctionComponent<ReviewNotesProps> = (
  props
) => {
  const { notes } = props;

  return (
    <>
      {notes.map((note, i) => (
        <div key={i}>
          {note.value}
          {note.isPostVisitAction &&
            (note.createdAt ? (
              <div>
                Post visit action created on{" "}
                {formatDate(new Date(note.createdAt), "d MMMM yyyy")}.
              </div>
            ) : (
              <div>A post visit action will be created on submission.</div>
            ))}
        </div>
      ))}
    </>
  );
};
