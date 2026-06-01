import type { ITriageRepository } from "../../domain/repositories/ITriageRepository";
import type { TriageNode } from "../../domain/entities/TriageEntity";
import { triageTree } from "../datasources/triageTreeData";

class TriageRepositoryImpl implements ITriageRepository {
  async getNodeById(id: string): Promise<TriageNode | null> {
    return Promise.resolve(triageTree[id] || null);
  }
}

export const triageRepository = new TriageRepositoryImpl();
