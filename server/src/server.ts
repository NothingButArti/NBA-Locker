/// <reference types="@citizenfx/server"/>

import { Locker, JobPermissions, JobName } from '../../shared/types';

declare const global: {
    source: number;
    Config: any;
};

const QBCore = exports['qb-core'].GetCoreObject();
const lockers: Map<string, Locker> = new Map();

(() => {
    for (const locker of Config.lockers) {
        lockers.set(locker.id, locker);
    }
})();

// Prüfe ob ein Spieler die Berechtigung hat, Spinde zu durchsuchen
const hasSearchPermission = (player: any): boolean => {
    const job = player.PlayerData.job.name as JobName;
    const grade = player.PlayerData.job.grade.level;
    const requiredGrade = (Config.permissions.searchLockers as JobPermissions)[job];
    
    return requiredGrade !== undefined && grade >= requiredGrade;
};

// Öffne das QB-Menu für einen Spind
const openLockerMenu = (source: number, lockerId: string) => {
    const Player = QBCore.Functions.GetPlayer(source);
    if (!Player) return;

    const locker = lockers.get(lockerId);
    if (!locker) return;

    const menuItems = [
        {
            header: `${Player.PlayerData.job.label} Spind von ${Player.PlayerData.charinfo.firstname} ${Player.PlayerData.charinfo.lastname}`,
            isMenuHeader: true
        },
        {
            header: "Spind öffnen",
            txt: "Öffne deinen persönlichen Spind",
            params: {
                event: "nba-locker:client:openPersonalLocker",
                args: {
                    lockerId: lockerId
                }
            }
        }
    ];

    // Wenn der Spieler die Berechtigung hat, füge Option zum Durchsuchen hinzu
    if (hasSearchPermission(Player)) {
        menuItems.push({
            header: "Spind durchsuchen",
            txt: "Durchsuche den Spind eines anderen Spielers",
            params: {
                event: "nba-locker:client:searchOtherLocker",
                args: {
                    lockerId: lockerId
                }
            }
        });
    }

    emitNet('nba-locker:client:openMenu', source, menuItems);
};

// Öffne das Inventar für einen Spieler
const openInventory = (source: number, targetId: number, lockerId: string) => {
    const Player = QBCore.Functions.GetPlayer(source);
    const Target = QBCore.Functions.GetPlayer(targetId);
    if (!Player || !Target) return;

    const locker = lockers.get(lockerId);
    if (!locker) return;

    const stashId = `stash-${Target.PlayerData.job.name}_${Target.PlayerData.citizenid}`;
    const maxSlots = locker.inventory?.maxSlots ?? Config.defaults.maxSlots;
    const maxWeight = locker.inventory?.maxWeight ?? Config.defaults.maxWeight;

    exports['ps-inventory'].OpenInventory("stash", stashId, {
        label: `${Target.PlayerData.job.label} Spind von ${Target.PlayerData.charinfo.firstname} ${Target.PlayerData.charinfo.lastname}`,
        maxweight: maxWeight,
        slots: maxSlots,
        owner: Target.PlayerData.citizenid
    }, source, false);
};

onNet('nba-locker:server:checkAccess', async (lockerId: string) => {
    const source = global.source;
    const Player = QBCore.Functions.GetPlayer(source);
    if (!Player) return;

    const locker = lockers.get(lockerId);
    if (!locker) return;

    const hasAccess = !locker.jobNames?.length || locker.jobNames.includes(Player.PlayerData.job.name);
    
    if (hasAccess) {
        openLockerMenu(source, lockerId);
    } else {
        emitNet('QBCore:Notify', source, 'Du hast keinen Zugriff auf diesen Spind', 'error');
    }
});

// Event für das Öffnen des persönlichen Spinds
onNet('nba-locker:server:openPersonalLocker', (lockerId: string) => {
    const source = global.source;
    openInventory(source, source, lockerId);
});

// Event für das Durchsuchen eines anderen Spinds
onNet('nba-locker:server:searchOtherLocker', (lockerId: string, targetId: number) => {
    const source = global.source;
    const Player = QBCore.Functions.GetPlayer(source);
    if (!Player || !hasSearchPermission(Player)) return;

    openInventory(source, targetId, lockerId);
});

