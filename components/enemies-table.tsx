'use client';

import enemies from '@fireballgg/sdk/data/enemies.json';
import { getItemById, EnemyIdDungeonTypesLookup, DungeonTypeNameLookup } from '@fireballgg/sdk';
import { Minus } from 'lucide-react';
import { UpscaleIcon } from './upscale-icon';

interface Enemy {
  docId: string;
  ID_CID: string;
  NAME_CID: string;
  EQUIPMENT_HEAD_CID: number;
  EQUIPMENT_BODY_CID: number;
  LOOT_ID_CID: number;
  MOVE_STATS_CID_array: number[];
}

// MOVE_STATS_CID_array: [Rock ATK, Rock DEF, Paper ATK, Paper DEF, Scissor ATK, Scissor DEF, Health, Armor]
const STATS_LABELS = ['Sword ATK', 'Sword DEF', 'Shield ATK', 'Shield DEF', 'Magic ATK', 'Magic DEF', 'HP', 'Armor'];

export function EnemiesTable() {
  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-fd-border bg-fd-muted">
            <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Head</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Body</th>
            {STATS_LABELS.map((label) => (
              <th key={label} className="px-4 py-3 text-left text-sm font-semibold">{label}</th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold">Dungeons</th>
          </tr>
        </thead>
        <tbody>
          {(enemies as Enemy[]).map((enemy) => (
            <tr
              key={enemy.ID_CID}
              className="border-b border-fd-border hover:bg-fd-muted/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-fd-muted-foreground align-middle">{enemy.ID_CID}</td>
              <td className="px-4 py-3 text-sm font-medium align-middle">{enemy.NAME_CID}</td>
              <td className="px-4 py-3 align-middle">
                {enemy.EQUIPMENT_HEAD_CID && getItemById(enemy.EQUIPMENT_HEAD_CID)?.ICON_URL_CID
                  ? <UpscaleIcon itemId={enemy.EQUIPMENT_HEAD_CID} size={40} />
                  : <Minus className="h-3.5 w-3.5 text-fd-muted-foreground" />}
              </td>
              <td className="px-4 py-3 align-middle">
                {enemy.EQUIPMENT_BODY_CID && getItemById(enemy.EQUIPMENT_BODY_CID)?.ICON_URL_CID
                  ? <UpscaleIcon itemId={enemy.EQUIPMENT_BODY_CID} size={40} />
                  : <Minus className="h-3.5 w-3.5 text-fd-muted-foreground" />}
              </td>
              {STATS_LABELS.map((_, i) => (
                <td key={i} className="px-4 py-3 text-sm align-middle">
                  {enemy.MOVE_STATS_CID_array[i] ?? <Minus className="h-3.5 w-3.5 text-fd-muted-foreground" />}
                </td>
              ))}
              <td className="px-4 py-3 text-sm align-middle">
                {EnemyIdDungeonTypesLookup[Number(enemy.ID_CID)]?.map((type) => DungeonTypeNameLookup[type]).join(', ') || <Minus className="h-3.5 w-3.5 text-fd-muted-foreground" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
