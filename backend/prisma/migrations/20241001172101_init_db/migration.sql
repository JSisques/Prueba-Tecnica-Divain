/*
  Warnings:

  - You are about to drop the column `date` on the `MovementHistory` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MovementHistory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovementHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stockId" INTEGER NOT NULL,
    CONSTRAINT "MovementHistory_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MovementHistory" ("createdAt", "id", "quantity", "stockId", "type") SELECT "createdAt", "id", "quantity", "stockId", "type" FROM "MovementHistory";
DROP TABLE "MovementHistory";
ALTER TABLE "new_MovementHistory" RENAME TO "MovementHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
