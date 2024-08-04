"use client";
import { Layer, Stage, Line } from "react-konva";
import { useEffect, useState } from "react";
import { Vector2d } from "konva/lib/types";

const Grid = ({ cellWidth = 50, cellHeight = 50, stroke = "#28332d" }) => {
  const stagePos = { x: 0, y: 0 }
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [gridComponents, setGridComponents] = useState<any[]>([]);

  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    setGridComponents(redrawGrid(cellWidth, cellHeight, stagePos, windowSize, stroke));
  }, [windowSize]);

  return (
    <Stage
      className="absolute top-0 left-0"
      width={windowSize.width}
      height={windowSize.height}
    >
      <Layer>{gridComponents}</Layer>
    </Stage>
  );
};

function redrawGrid(
  cellWidth: number,
  cellHeight: number,
  stagePos: Vector2d,
  windowSize: { width: number; height: number },
  stroke: string,
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
        stroke={stroke}
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
        stroke={stroke}
        strokeWidth={0.5}
      />
    );
  }
  return c;
}

export default Grid;
