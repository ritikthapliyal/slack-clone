import getUrl from "./urls"
import axios from "axios"


export async function fetchUserData() {
    try {
        const url = getUrl('user', 'info')
        const { data } = await axios.get(url, { withCredentials: true })
        return data.data
    } catch (err) {
        throw err
    } 
}


export async function upoadProfileImageToS3({file_type, photo_file}) {
    try {
        
        const url = getUrl('user', 'profile_image_upload')
        const { data } = await axios.get(url,{ params: { contentType : file_type }, withCredentials: true })
        const {signedUrl, fileName} = data.data

        console.log(signedUrl)
        console.log(fileName)

        const {status,statusText} = await axios.put(signedUrl, photo_file)
        
        return {status, statusText ,fileName}

    } catch (err) {
        throw err
    }
}


