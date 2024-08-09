"use client";
import { useDiagramById } from "@/lib/hooks";
import { updateDiagramName } from "@/lib/util";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface DiagramNameChangerProps {
  id: string;
}

const DiagramNameChanger = ({ id }: DiagramNameChangerProps) => {
  const diagram = useDiagramById(id);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [state, setState] = useState<"editing" | "display">("display");

  const textRef = useRef<HTMLInputElement>(null);

  const changeName = async (newName: string) => {
    if (diagram) {
      if (await updateDiagramName(diagram, newName)) {
        toast.success(`Changed name to '${newName}'`);
      } else {
        toast.error("Failed to change name");
      }
    }
  };

  // Set value to the name prop if it changes.
  useEffect(() => {
    if (diagram) {
      setName(diagram.name);
      setValue(diagram.name);
    }
  }, [diagram]);

  // When the state changes to editing mode, make sure to
  // bring the text element into focus. Without this when
  // state changes to editing mode and the text box for changing
  // the name appears it wont have the cursor blinking inside it.
  useEffect(() => {
    if (state === "editing" && textRef.current) {
      textRef.current.focus();
    }
  }, [state]);

  if (state === "display") {
    return (
      <span
        className="w-40 inline-block text-center hover:cursor-pointer"
        onDoubleClick={() => setState("editing")}
      >
        {name}
      </span>
    );
  } else {
    return (
      <input
        type="text"
        ref={textRef}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.code === "Escape") {
            setState("display");
            setValue(name);
          } else if (e.code === "Enter") {
            setState("display");
            changeName(value);
          }
        }}
        onBlur={() => {
          setState("display");
          setValue(name);
        }}
        className="outline-none bg-transparent"
      />
    );
  }
};

export default DiagramNameChanger;
