/// <reference types="@citizenfx/client"/>
/// <reference path="./types/fivem.d.ts"/>

import { Locker, MenuItem } from '../../shared/types';

declare const Config: any;
declare function Wait(ms: number): Promise<void>;

let isNearLocker = false;
let currentLocker: Locker | null = null;
let cachedPlayerJob: any = null;

// QB-Menu Event Handler
RegisterNuiCallback('qb-menu:closeMenu', () => {
    exports['qb-core'].DrawText(`[E] ${cachedPlayerJob?.label || ''}-Spind`, 'left');
});

// QB-Menu Event Handler
onNet('nba-locker:client:openMenu', (menuItems: MenuItem[]) => {
    exports['qb-menu'].openMenu(menuItems);
});

const getPlayerJob = () => {
    if (cachedPlayerJob) return cachedPlayerJob;
    const QBCore = exports['qb-core'].GetCoreObject();
    const playerData = QBCore.Functions.GetPlayerData();
    cachedPlayerJob = playerData.job || null;
    return cachedPlayerJob;
};

onNet('QBCore:Client:OnJobUpdate', (job: any) => {
    cachedPlayerJob = job;
});

const hasLockerAccess = (locker: Locker): boolean => {
    const playerJob = getPlayerJob();
    if (!playerJob) return false;
    if (!locker.jobNames || locker.jobNames.length === 0) return true;
    return locker.jobNames.includes(playerJob.name);
};

// Event für das Öffnen des persönlichen Spinds
onNet('nba-locker:client:openPersonalLocker', (data: any) => {
    if (!currentLocker) return;
    TriggerServerEvent('nba-locker:server:openPersonalLocker', currentLocker.id);
});

// Event für das Durchsuchen eines anderen Spinds
onNet('nba-locker:client:searchOtherLocker', async (data: any) => {
    if (!currentLocker) return;

    const playerPed = PlayerPedId();
    const [x, y, z] = GetEntityCoords(playerPed, true);
    
    // Finde Spieler in der Nähe
    const players = exports['qb-core'].GetPlayers();
    const nearbyPlayers = players.filter((player: any) => {
        const targetPed = GetPlayerPed(GetPlayerFromServerId(player));
        const [targetX, targetY, targetZ] = GetEntityCoords(targetPed, true);
        const dist = GetDistanceBetweenCoords(x, y, z, targetX, targetY, targetZ, true);
        return dist < 3.0 && player.serverId !== GetPlayerServerId(PlayerId());
    });

    if (nearbyPlayers.length === 0) {
        exports['qb-core'].Notify('Keine Spieler in der Nähe', 'error');
        return;
    }

    // Erstelle QB-Menu für Spielerauswahl
    const menuItems: MenuItem[] = [
        {
            header: "Spieler auswählen",
            isMenuHeader: true
        }
    ];

    for (const player of nearbyPlayers) {
        menuItems.push({
            header: player.name,
            txt: `Server ID: ${player.serverId}`,
            params: {
                event: "nba-locker:client:selectPlayer",
                args: {
                    targetId: player.serverId
                }
            }
        });
    }

    exports['qb-menu'].openMenu(menuItems);
});

// Event für die Spielerauswahl
onNet('nba-locker:client:selectPlayer', (data: any) => {
    if (!currentLocker) return;
    TriggerServerEvent('nba-locker:server:searchOtherLocker', currentLocker.id, data.targetId);
});

onNet('ps-inventory:client:SetCurrentStash', async (data: any) => {
    const match = data.id?.match(/^pd_locker_(.+)$/);
    if (!match || data.type !== 'stash') return;
    
    const lockerId = match[1].replace(/^pd_locker_/, '');
    currentLocker = Config.lockers.find((l: Locker) => l.id === lockerId) || null;
});

onNet('ps-inventory:client:ItemMoved', async () => {
    if (!currentLocker) return;
    try {
        await Wait(100);
        const cleanLockerId = currentLocker.id.replace(/^pd_locker_/, '');
        emitNet('nba-locker:server:requestSaveItems', cleanLockerId);
    } catch (error) {}
});

onNet('ps-inventory:client:CloseInventory', () => {
    currentLocker = null;
});

setTick(async () => {
    await Wait(500);
    
    if (!Config.lockers?.length) return;
    
    const playerPed = PlayerPedId();
    const [x, y, z] = GetEntityCoords(playerPed, true);
    
    const accessibleLockers = Config.lockers.filter(hasLockerAccess);
    let foundNearbyLocker = false;
    
    for (const locker of accessibleLockers) {
        const dist = GetDistanceBetweenCoords(
            x, y, z,
            locker.position.x, locker.position.y, locker.position.z,
            true
        );
        
        if (dist < 30.0) {
            DrawMarker(
                2,
                locker.position.x,
                locker.position.y,
                locker.position.z - 0.2,
                0.0, 0.0, 0.0,
                0.0, 0.0, 0.0,
                0.3, 0.3, 0.3,
                30, 150, 255,
                155,
                false,
                false,
                2,
                false,
                null,
                null,
                false
            );
            
            if (dist < 2.0) {
                foundNearbyLocker = true;
                if (!isNearLocker) {
                    isNearLocker = true;
                    currentLocker = locker;
                    const playerJob = getPlayerJob();
                    exports['qb-core'].DrawText(`[E] ${playerJob?.label || ''}-Spind`, 'left');
                }
                
                if (IsControlJustReleased(0, 38)) {
                    exports['qb-core'].HideText();
                    TriggerServerEvent('nba-locker:server:checkAccess', locker.id);
                }
                break;
            }
        }
    }
    
    if (!foundNearbyLocker && isNearLocker) {
        isNearLocker = false;
        currentLocker = null;
        exports['qb-core'].HideText();
    }
});