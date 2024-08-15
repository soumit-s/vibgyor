"use client";
import { Layer, Stage, Line } from "react-konva";
import { useEffect, useState } from "react";
import { Vector2d } from "konva/lib/types";
import { KonvaEventObject } from "konva/lib/Node";
import DiagramGrid from "../diagram-grid";
import { useEntites } from "@/lib/hooks";
import dynamic from "next/dynamic";
const Entity = dynamic(() => import("@/components/ground/entity"), {
  ssr: false,
});

interface DiagramProps {
  diagramId: string;
}

const Diagram = ({ diagramId }: DiagramProps) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [stagePos, setStagePos] = useState<Vector2d>({ x: 0, y: 0 });
  const entities = useEntites(diagramId);

  const handleWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    // e.evt.deltaY ?
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Stage
      className="absolute top-0 left-0"
      width={windowSize.width}
      height={windowSize.height}
      draggable
      onDragEnd={(e) => setStagePos(e.currentTarget.position())}
      onWheel={handleZoom}
    >
      <DiagramGrid stagePos={stagePos} windowSize={windowSize} />
      <Layer>
        {entities &&
          entities.map((entity) => (
            <Entity key={entity.id} entityId={entity.id} />
          ))}
      </Layer>
    </Stage>
  );
};

export default Diagram;
