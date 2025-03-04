const Config = {
    defaults: {
        maxWeight: 100000,
        maxSlots: 50,
    },
    
    // Job-Ränge und deren Berechtigungen
    jobRanks: {
        police: {
            cadet: 0,
            officer: 1,
            sergeant: 2,
            lieutenant: 3,
            chief: 4
        },
        northambulance: {
            intern: 0,
            paramedic: 1,
            doctor: 2,
            chief: 3
        }
    },
    
    // Minimale Ränge für bestimmte Aktionen
    permissions: {
        searchLockers: {
            police: 2, // Sergeant und höher
            northambulance: 2 // Doctor und höher
        }
    },
    
    lockers: [
        {
            id: 'pd_locker_1',
            label: 'LSPD Spind',
            position: { x: 195.21, y: -933.85, z: 30.694 },
            jobNames: ['police']
        },
        {
            id: 'ems_locker_1',
            label: 'EMS Spind',
            position: { x: 301.94, y: -599.37, z: 43.28 },
            jobNames: ['northambulance']
        }
    ]
};

(globalThis as any).Config = Config; 