import type { TriageNode } from "../entities/TriageEntity";

export interface ITriageRepository {
  getNodeById(id: string): Promise<TriageNode | null>;
}
