import getUrl from "./urls"
import axios from "axios"

export async function addNewWorkspace({workspace_name,invite_emails,photo}) {
    try {
        const url = getUrl('workspace', 'add_new_workspace')
        const { data } = await axios.post(url,{workspace_name,invite_emails,photo}, {withCredentials: true })
        return data.data
    } catch (err) {
        throw err
    }
}