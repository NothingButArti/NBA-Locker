interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Inventory {
    maxWeight: number;
    maxSlots: number;
}

interface MenuItem {
    header: string;
    isMenuHeader?: boolean;
    txt?: string;
    params?: {
        event: string;
        args?: any;
    };
}

type JobName = keyof JobPermissions;

interface JobPermissions {
    police: number;
    northambulance: number;
}

export interface Locker {
    id: string;
    label: string;
    position: Vector3;
    inventory?: Inventory;
    jobNames?: string[];
}

// Exportiere zusätzliche Typen
export type { Vector3, Inventory, MenuItem, JobPermissions, JobName };