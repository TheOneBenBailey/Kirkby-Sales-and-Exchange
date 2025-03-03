import { API_KEY, API_URL, DTD_LIVE_CMS_API_KEY, DTD_LIVE_CMS_API_URL } from "$env/static/private";

/**
 * @param {string} endpoint
 * @returns {Promise<Response>}
 */
export const fetchFromMPP = (endpoint) => {
    const url = API_URL + API_KEY + '/' + endpoint;
    return fetch(url);
}

/**
 * 
 * @param {string} email 
 * @returns {Promise<Response>}
 */
export const fetchUserMarketingPreferences = (email) => {
    const url = DTD_LIVE_CMS_API_URL + '/api/v1/user-marketing-preferences/' + email;
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + DTD_LIVE_CMS_API_KEY
        }
    }) 
}

/**
 * 
 * @param {import("./app").UserMarketingPreferences} user 
 * @returns {Promise<Response>}
 */
export const putUserMarketingPreferences = (user) => {
    const url = DTD_LIVE_CMS_API_URL + '/api/v1/user-marketing-preferences/' + user.email;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + DTD_LIVE_CMS_API_KEY
        },
        body: JSON.stringify({
            "mpp": user.mpp,
            "dtdLive": user.dtdLive
        })
    }) 
}
