import getUrl from "./urls"
import axios from "axios"

export async function addNewWorkspace({workspace_name,invite_emails,photo,username}) {
    try {
        const url = getUrl('workspace', 'add_new_workspace')
        const { data } = await axios.post(url,{workspace_name,invite_emails,photo,username}, {withCredentials: true })
        return data.data
    } catch (err) {
        throw err
    }
}