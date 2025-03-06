import { CSSProperties, memo } from "react";
import { GridRow, GridRowProps } from "@mui/x-data-grid";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const DraggableGridRow = memo((params: GridRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: params.rowId});

  const style : CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
  };

  return (
    <div ref={setNodeRef} style={style} >
        <div
        {...attributes}
        {...listeners}
        style={{
          position: "absolute",
          cursor: "grab",
          width: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          bottom: 0,
        }}
      >
        <DragIndicatorIcon/>
      </div>
      <GridRow  {...params} />
    </div>
  );
});

export default DraggableGridRow;
