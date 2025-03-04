declare function on(eventName: string, callback: (...args: any[]) => void): void;
declare function onNet(eventName: string, callback: (...args: any[]) => void): void;
declare function RegisterNuiCallbackType(callbackType: string): void;
declare function SetNuiFocus(hasFocus: boolean, hasCursor: boolean): void;
declare function SendNUIMessage(data: any): void;
declare function GetHashKey(model: string): number;
declare function RequestModel(model: number): void;
declare function HasModelLoaded(model: number): boolean;
declare function CreateVehicle(modelHash: number, x: number, y: number, z: number, heading: number, isNetwork: boolean, netMissionEntity: boolean): number;
declare function PlayerPedId(): number;
declare function SetPedIntoVehicle(ped: number, vehicle: number, seatIndex: number): void;
declare function SetVehicleFuelLevel(vehicle: number, level: number): void;
declare function SetModelAsNoLongerNeeded(model: number): void;
declare function SetEntityCoords(entity: number, x: number, y: number, z: number, xAxis: boolean, yAxis: boolean, zAxis: boolean, clearArea: boolean): void;
declare function RegisterCommand(commandName: string, handler: (...args: any[]) => void, restricted: boolean): void;
declare function setTick(handler: () => void): void;
declare function GetEntityCoords(entity: number, alive: boolean): [number, number, number];
declare function GetDistanceBetweenCoords(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, useZ: boolean): number;
declare function BeginTextCommandDisplayHelp(text: string): void;
declare function AddTextComponentString(text: string): void;
declare function EndTextCommandDisplayHelp(p0: number, loop: boolean, beep: boolean, duration: number): void;
declare function IsControlJustReleased(padIndex: number, control: number): boolean;
declare function TriggerEvent(eventName: string, ...args: any[]): void;
declare function GetVehiclePedIsIn(ped: number, lastVehicle: boolean): number;
declare function GetVehicleFuelLevel(vehicle: number): number;
declare function PlaySound(soundId: number, audioName: string, audioRef: string, p3: number, p4: number, p5: number): void;
declare function TriggerServerEvent(eventName: string, ...args: any[]): void;
declare function GetVehicleNumberPlateText(vehicle: number): string;
declare function GetCurrentResourceName(): string;
declare const source: number;
declare function emitNet(eventName: string, target: number, ...args: any[]): void;
declare function GetEntityHeading(entity: number): number;
declare function SetEntityHeading(entity: number, heading: number): void;
declare function emit(eventName: string, ...args: any[]): void;
declare function GetEntityCoords(entity: number, alive: boolean): [number, number, number];
declare function GetDistanceBetweenCoords(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, useZ: boolean): number;
declare function IsControlJustReleased(inputGroup: number, control: number): boolean;

// Blip Funktionen
declare function AddBlipForCoord(x: number, y: number, z: number): number;
declare function SetBlipSprite(blip: number, sprite: number): void;
declare function SetBlipDisplay(blip: number, display: number): void;
declare function SetBlipScale(blip: number, scale: number): void;
declare function SetBlipColour(blip: number, colour: number): void;
declare function SetBlipAsShortRange(blip: number, toggle: boolean): void;
declare function BeginTextCommandSetBlipName(textLabel: string): void;
declare function AddTextComponentString(text: string): void;
declare function EndTextCommandSetBlipName(blip: number): void;

// Marker Funktionen
declare function DrawMarker(
    type: number,
    posX: number,
    posY: number,
    posZ: number,
    dirX: number,
    dirY: number,
    dirZ: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    scaleX: number,
    scaleY: number,
    scaleZ: number,
    red: number,
    green: number,
    blue: number,
    alpha: number,
    bobUpAndDown: boolean,
    faceCamera: boolean,
    p19: number,
    rotate: boolean,
    textureDict: string | null,
    textureName: string | null,
    drawOnEnts: boolean
): void;

// Resource Funktionen
declare function GetCurrentResourceName(): string; 