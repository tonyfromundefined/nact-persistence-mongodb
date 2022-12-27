import type { Collection, MongoClient } from "mongodb";
import type {
  EventStream,
  PersistedEvent,
  PersistedSnapshot,
  PersistenceEngine,
} from "nact";

import { isNil } from "./isNil";

const DEFAULT_EVENT_JOURNAL_NAME = "nact_event_journal";
const DEFAULT_SNAPSHOT_STORE_NAME = "nact_snapshot_store";

export class MongoDBPersistenceEngine implements PersistenceEngine {
  /**
   * Collection which persists `PersistedEvent[]`
   */
  eventsCollection: Collection<PersistedEvent>;

  /**
   * Collection which persists `PersistedSnapshot[]`
   */
  snapshotsCollection: Collection<PersistedSnapshot>;

  constructor(
    private mongoClient: MongoClient,
    options?: {
      eventJournalCollectionName?: string;
      snapshotStoreCollectionName?: string;
    },
  ) {
    const db = this.mongoClient.db();

    this.eventsCollection = db.collection<PersistedEvent>(
      options?.eventJournalCollectionName ?? DEFAULT_EVENT_JOURNAL_NAME,
    );
    this.snapshotsCollection = db.collection<PersistedSnapshot>(
      options?.snapshotStoreCollectionName ?? DEFAULT_SNAPSHOT_STORE_NAME,
    );
  }

  events(
    persistenceKey: string,
    offset?: number,
    limit?: number,
    tags?: string[],
  ): EventStream {
    let cursor = this.eventsCollection
      .find({
        key: persistenceKey,
        ...(!isNil(tags)
          ? {
              tags: {
                $in: tags,
              },
            }
          : null),
      })
      .sort({
        createdAt: -1,
      });

    if (!isNil(offset)) {
      cursor = cursor.skip(offset);
    }
    if (!isNil(limit)) {
      cursor = cursor.limit(limit);
    }

    const result = cursor.toArray();

    return {
      then(onfullfilled) {
        return result.then(onfullfilled);
      },
      async reduce(...args) {
        return result.then((events) => events.reduce(...args));
      },
    };
  }

  async latestSnapshot(persistenceKey: string) {
    const cursor = this.snapshotsCollection
      .find({
        key: persistenceKey,
      })
      .sort({
        createdAt: -1,
      })
      .limit(1);

    const snapshot = await cursor.next();

    return snapshot;
  }

  async takeSnapshot(persistedSnapshot: PersistedSnapshot): Promise<void> {
    await this.snapshotsCollection.insertOne(persistedSnapshot);
  }

  async persist(persistedEvent: PersistedEvent): Promise<void> {
    await this.eventsCollection.insertOne(persistedEvent);
  }
}
