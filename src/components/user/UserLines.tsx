import type { AssignedLinesInterface } from "../../types/interfaces/line/AssignedLineInterface";

interface UserLignInterface {
  assignedLines: AssignedLinesInterface[];
}

const UserLines = ({ assignedLines }: UserLignInterface) => {
  return (
    <>
      {assignedLines && (
        <span className="flex">
          <ul className=" px-2 flex gap-2">
            {assignedLines.map((assignedLin) => (
              <li key={assignedLin.line.id}>{assignedLin.line.name}</li>
            ))}
          </ul>
        </span>
      )}
    </>
  );
};

export default UserLines;
