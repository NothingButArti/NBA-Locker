fx_version 'cerulean'
game 'gta5'

author 'NBA'
description 'Locker System mit PS-Inventory Integration'
version '1.0.0'

shared_script 'dist/shared/config.js'

client_script 'dist/client/src/client.js'

server_script 'dist/server/src/server.js'

dependencies {
    'qb-core',
    'ps-inventory',
    'qb-menu'
}
