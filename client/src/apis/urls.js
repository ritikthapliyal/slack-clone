const BASE_URL = process.env.REACT_APP_BASE_URL

const routes = {
    'auth': {
        'google': '/google',
    },
    'user': {
        'info': '/',
        'image_upload' : '/image/upload'
    },
    'workspace': {
        'add_new_workspace': '/',
    },
}


function getUrl(resource, route) {
    const url = `${BASE_URL}/${resource}${routes[resource][route]}`
    return url
}

export default getUrl

