![NAct Logo](https://raw.githubusercontent.com/ncthbrt/nact/master/assets/logo.svg?sanitize=true)

# nact-persistence-mongodb
![](https://img.shields.io/npm/v/nact-persistence-mongodb)
![](https://img.shields.io/npm/l/nact-persistence-mongodb)

A MongoDB persistence plugin for [NAct](https://nact.xyz/).

## Usage

```typescript
import { MongoClient } from "mongodb";
import { MongoDBPersistenceEngine } from "nact-persistence-mongodb";

const mongoClient = new MongoClient("...");

const system = start(
  configurePersistence(
    new MongoDBPersistenceEngine(mongoClient, {
      dbName: "...", // optional
      dbOptions: { ... }, // optional
      eventsCollectionName: "nact_events", // optional
      eventsCollectionOptions: { ... }, // optional
      snapshotsCollectionName: "nact_snapshots", // optional
      snapshotsCollectionOptions: { ... }, // optional
    }),
  ),
);
```

## References

- [`nact`](https://nact.xyz/)
- [`nact-persistence-postgres`](https://github.com/ncthbrt/nact-persistence-postgres)
- [`mongodb`](https://www.mongodb.com/docs/drivers/node/current/)
