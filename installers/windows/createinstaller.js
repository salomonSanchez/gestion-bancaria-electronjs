const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig() {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
        appDirectory: path.join(outPath, 'gestion-bancaria-electron-win32-x64/'),
        authors: 'salomon sanchez perez',
        noMsi: true,
        outputDirectory: path.join(outPath, 'windows-installer'),
        exe: 'gestion-bancaria-electron.exe',
        setupExe: 'gestion-bancaria-electron.exe',
        setupMsi: 'gestion.msi',
        //iconUrl: path.join(rootPath, 'assets', 'img', 'Hypnotoad-icon-256_37826.ico'),
        setupIcon: path.join(rootPath, 'assets', 'img', 'Hypnotoad-icon-256_37826.ico')
    })
}