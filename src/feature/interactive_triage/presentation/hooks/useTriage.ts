import { useState, useEffect } from "react";
import type { TriageNode } from "../../domain/entities/TriageEntity";
import { triageRepository } from "../../data/repositories/TriageRepositoryImpl";

export const useTriage = () => {
  const [currentNode, setCurrentNode] = useState<TriageNode | null>(null);

  const loadNode = async (id: string) => {
    const node = await triageRepository.getNodeById(id);
    setCurrentNode(node);
  };

  useEffect(() => {
    loadNode("start");
  }, []);

  const handleAnswer = (answer: "yes" | "no") => {
    if (!currentNode) return;

    const nextNodeId =
      answer === "yes" ? currentNode.yesNextNodeId : currentNode.noNextNodeId;
    if (nextNodeId) {
      loadNode(nextNodeId);
    }
  };

  const resetTriage = () => loadNode("start");

  return { currentNode, handleAnswer, resetTriage };
};
