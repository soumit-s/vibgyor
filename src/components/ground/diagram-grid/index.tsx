"use client";
import { Layer, Stage, Line } from "react-konva";
import { useEffect, useState } from "react";
import { Vector2d } from "konva/lib/types";
import { KonvaEventObject } from "konva/lib/Node";

interface DiagramGridProps {
  windowSize: { width: number, height: number },
  stagePos: Vector2d,
  cellWidth?: number;
  cellHeight?: number;
  zoomFactor?: number;
}

const DiagramGrid = ({
  windowSize,
  stagePos,
  cellWidth = 50,
  cellHeight = 50,
  zoomFactor = 1,
}: DiagramGridProps) => {
  const [gridComponents, setGridComponents] = useState<any[]>([]);

  useEffect(() => {
    setGridComponents(redrawGrid(cellWidth, cellHeight, stagePos, windowSize));
  }, [windowSize, stagePos]);

  return <Layer>{gridComponents}</Layer>;
};

function redrawGrid(
  cellWidth: number,
  cellHeight: number,
  stagePos: Vector2d,
  windowSize: { width: number; height: number }
) {
  const a = Math.floor(stagePos.x / cellWidth) * cellWidth;
  const b = Math.floor(stagePos.y / cellHeight) * cellHeight;

  const c = [];
  for (let i = 0; i < windowSize.width / cellWidth; ++i) {
    c.push(
      <Line
        key={"v" + i}
        x={-a + i * cellWidth}
        y={-stagePos.y}
        points={[0, 0, 0, windowSize.height]}
        stroke="#212b26"
        strokeWidth={0.5}
      />
    );
  }

  for (let i = 0; i < windowSize.height / cellHeight; ++i) {
    c.push(
      <Line
        key={"h" + i}
        x={-stagePos.x}
        y={-b + i * cellHeight}
        points={[0, 0, windowSize.width, 0]}
        stroke="#212b26"
        strokeWidth={0.5}
      />
    );
  }
  return c;
}

export default DiagramGrid;
