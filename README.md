# 🔒 NBA-Locker System

Ein Spind System für PS-Inventory für diverse Jobs.

## ✨ Hauptfunktionen

- 👮‍♂️ **Job-basierte Spinde**: Speziell konfigurierte Spinde für verschiedene Jobs (LSPD, EMS, etc.)
- 🔑 **Berechtigungssystem**: Fortschrittliches rangbasiertes Zugriffssystem
- 🔍 **Durchsuchungsfunktion**: Ermöglicht autorisierten Mitarbeitern die Durchsuchung von Spinden
- 📦 **PS-Inventory Integration**: Nahtlose Einbindung in das bestehende Inventarsystem
- 💾 **Persistente Speicherung**: Zuverlässige Datenspeicherung aller Spindinhalte
- 📱 **QB-Menu Integration**: Intuitive Benutzeroberfläche für alle Aktionen

## 📋 Voraussetzungen

- FiveM Server
- QB-Core Framework
- QB-Menu
- PS-Inventory

## ⚙️ Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/NothingButArti/NBA-locker.git
   ```

2. **In den Projektordner wechseln**
   ```bash
   cd NBA-locker
   ```

3. **Dependencies installieren**
   ```bash
   npm install
   ```

4. **Build erstellen**
   ```bash
   npm run build
   ```

5. **Resource in der `server.cfg` aktivieren**
   ```cfg
   ensure NBA-locker
   ```

## 🛠️ Konfiguration

### Basis-Konfiguration
Die Hauptkonfiguration erfolgt in `shared/config.ts`:

```typescript
{
    defaults: {
        maxWeight: 100000,  
        maxSlots: 50,     
    },
    
    jobRanks: {
        police: {          // Rang-Definitionen pro Job
            cadet: 0,
            officer: 1,
            sergeant: 2,
            lieutenant: 3,
            chief: 4
        }
    },
    
    permissions: {
        searchLockers: {   
            police: 2,     
        }
    }
}
```

### Spind-Positionen
Definieren Sie Spind-Positionen in der Konfiguration:

```typescript
lockers: [
    {
        id: 'pd_locker_1',
        label: 'LSPD Spind',
        position: { x: 195.21, y: -933.85, z: 30.694 },
        jobNames: ['police']
    }
]
```

## 🎮 Nutzung

### Grundlegende Bedienung

1. Nähere dich einem Spind deines Jobs
2. Drücke `[E]` zur Interaktion
3. Wählen im QB-Menu:
   - "Spind öffnen" für persönlichen Spind
   - "Spind durchsuchen" (wenn berechtigt)

### Durchsuchungsfunktion

1. Wähle "Spind durchsuchen" im Menü
2. Wähle einen Spieler aus der Liste (3m Radius)
3. Durchsuche den gewählten Spind

## 👥 Berechtigungssystem

### Zugriffsstufen

1. **Basis-Zugriff**
   - Zugriff auf den eigenen Spind
   - Verfügbar für alle Job-Mitglieder

2. **Erweiterte Rechte**
   - Durchsuchung anderer Spinde
   - Verfügbar ab bestimmtem Rang

### Minimale Ränge für Durchsuchungen
- LSPD: Sergeant (Rang 2)
- Weitere Jobs können in der Konfiguration definiert werden

### Anpassungen
- Die Jobs bitte im Quelltext anpassen damit diese korrekt initiert werden

## 💻 Entwicklung

### Entwicklungsmodus starten
```bash
npm run watch
```

### Production Build erstellen
```bash
npm run build
```

## 🔧 Technische Details

- Entwickelt in TypeScript
- Modulares Design für einfache Erweiterbarkeit
- Server-seitige Validierung für maximale Sicherheit
- Optimierte Performance durch effizientes Event-Handling
- Caching-System für verbesserte Leistung

## 🐛 Fehlerbehebung

### Häufige Probleme

1. **Spind nicht sichtbar**
   - Überprüfen die Koordinaten in der Konfiguration
   - Stelle sicher, dass der Job korrekt gesetzt ist

2. **Zugriffsprobleme**
   - Validiere die Job-Ränge
   - Überprüfe die Berechtigungskonfiguration

## 📞 Support

Bei Fragen oder Problemen:
- Erstellen ein Issue auf GitHub
- Discord Support: #articurl

## 📄 Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.
