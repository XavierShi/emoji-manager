import { ipcMain } from 'electron'
import path from 'node:path'
import { access, mkdir, cp } from 'node:fs/promises'
import { constants } from 'node:fs';
import os from 'node:os'

function managerAdds() {
    /**
     * @description: 判断有无ManagerEmojis文件夹并创建
     * @param {*} createDir
     * @param {*} async
     * @return {*}
     */
    ipcMain.handle('createDir', async () => {
        const dir = os.homedir()
        try {
            await access(`${dir}/Pictures/ManagerEmojis`, constants.F_OK | constants.X_OK)
        } catch {
            try {
                await mkdir(`${dir}/Pictures/ManagerEmojis`)
            } catch {
                return false
            }
        }
        return true
    })
    /**
     * @description: 移动图片
     * @param {*} cpImg
     * @param {*} async
     * @return {*}
     */
    ipcMain.handle('cpImg', async (event: any, file: any) => {
        const dir = os.homedir()
        console.log(dir);
        console.log(file);
        try {
            await cp(file.path, `${dir}/Pictures/ManagerEmojis/${file.name}`)
        } catch (err) {
            console.log(err);
        }
    })
}

export default managerAdds
