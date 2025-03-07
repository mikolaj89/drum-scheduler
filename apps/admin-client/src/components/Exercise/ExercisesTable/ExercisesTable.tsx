import { memo, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import DraggableGridRow from "./DraggableRow";
import { Exercise } from "../../../../../api/db/exercises";
import { getExercisesColumns } from "./ExercisesTableHelper";

type ExercisesTableProps = {
  rows: Exercise[];
  columns: ReturnType<typeof getExercisesColumns>;
  onChange: (rows: Exercise[]) => void;
};

const ExercisesTable = memo(
  ({ rows, onChange, columns }: ExercisesTableProps) => {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = useCallback(
      (event: DragEndEvent) => {
        const { active, over } = event;
        if (over) {
          const oldIndex = rows.findIndex((rows) => rows.id === active.id);
          const newIndex = rows.findIndex((rows) => rows.id === over.id);
          onChange(arrayMove(rows, oldIndex, newIndex));
        }
      },
      [rows, onChange]
    );

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[
          restrictToVerticalAxis,
          restrictToWindowEdges,
          restrictToParentElement,
        ]}
        autoScroll={false}
      >
        <SortableContext
          items={rows.map((row) => row.id)}
          strategy={verticalListSortingStrategy}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            slots={{ row: DraggableGridRow }}
            disableRowSelectionOnClick
          />
        </SortableContext>
      </DndContext>
    );
  }
);

export default ExercisesTable;
