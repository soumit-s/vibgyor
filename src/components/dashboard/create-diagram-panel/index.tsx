"use client";

import Button from "@/components/common/button";
import TextBox from "@/components/common/txtbox";
import { createDiagram, isDiagramExistsByName } from "@/lib/util";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateDiagramPanel = () => {
  const [diagramName, setDiagramName] = useState("");
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCreate = () => {
    setCreating(true);
    // (async () => {throw new Error("")})()
    createDiagram({ name: diagramName })
      .then(() => {
        setDiagramName("");
        toast(`Created diagram '${diagramName}'`, { closeButton: false });
      })
      .catch((e) => {
        console.log(e);
        toast.error(`Failed to create diagram '${diagramName}'`);
      })
      .finally(() => setCreating(false));
  };

  useEffect(() => {
    if (!diagramName.match(/^[a-zA-Z_0-9 ]*$/g)) {
      setErrorMsg(
        "Name can contain alphabets(a-z, A-Z), digits(0-9) and underscore(_)"
      );
    } else {
      setErrorMsg(null);
      isDiagramExistsByName(diagramName)
        .then((is) => {
          if (is) {
            setErrorMsg("Name already taken !");
          } else {
            setErrorMsg(null);
          }
        })
        .catch((_) => setErrorMsg("Oops! Unexpected error"));
    }
  }, [diagramName]);

  return (
    <div className="p-4">
      <TextBox
        value={diagramName}
        placeholder="Diagram Name"
        className="w-64"
        onChange={(e) => setDiagramName(e.currentTarget.value)}
        msg={errorMsg || undefined}
        msgType={errorMsg ? "error" : undefined}
      />
      <Button
        variant="filled"
        state={
          creating
            ? "processing"
            : (diagramName.length != 0 && !errorMsg && "enabled") || "disabled"
        }
        className="font-common mt-4"
        onClick={() => !creating && handleCreate()}
      >
        {creating ? <div>Creating</div> : "Create"}
      </Button>
    </div>
  );
};

export default CreateDiagramPanel;
