export const postApi = async (url, body, token = null) => {
    // eslint-disable-next-line no-useless-catch
    const request = await fetch(`${process.env.VUE_APP_BASE_URL_API}/${url}`, {
        method: "POST",
        mode: "cors",
        headers: generateHeaders(token),
        body: JSON.stringify(body)
    })

    if (request.status >= 400) {
        let response = await request.json()
        throw new Error(response)
    }

    return await request.json()
}

export const getApi = async (url, token = null) => {
    // eslint-disable-next-line no-useless-catch
    const request = await fetch(`${process.env.VUE_APP_BASE_URL_API}/${url}`, {
        method: "GET",
        mode: "cors",
        headers: generateHeaders(token),
    })

    if (request.status >= 400) {
        let response = await request.json()
        throw new Error(response)
    }

    return await request.json()
}

export const deleteApi = async (url, token = null) => {
    // eslint-disable-next-line no-useless-catch
    const request = await fetch(`${process.env.VUE_APP_BASE_URL_API}/${url}`, {
        method: "DELETE",
        mode: "cors",
        headers: generateHeaders(token),
    })

    if (request.status >= 400) {
        let response = await request.json()
        throw new Error(response)
    }

    return await request.json()
}

export const putApi = async (url, body, token = null) => {
    // eslint-disable-next-line no-useless-catch
    const request = await fetch(`${process.env.VUE_APP_BASE_URL_API}/${url}`, {
        method: "PUT",
        mode: "cors",
        headers: generateHeaders(token),
        body: JSON.stringify(body)
    })

    if (request.status >= 400) {
        let response = await request.json()
        throw new Error(response)
    }

    return await request.json()
}

const generateHeaders = (token) => {
    if (token !== null) {
        return {
            "Content-Type": "application/json",
            "Authorization": token
        }
    } else {
        return {
            "Content-Type": "application/json"
        }
    }
}