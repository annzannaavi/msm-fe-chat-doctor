import {apiRequest} from "@/utils/api";

export const fetchMonetizeAggr = (params: object, token: string, daleman = false) =>
    apiRequest({
        method: 'GET',
        path: '/earning/earning-aggregator',
        params,
        token,
        daleman
    })

export const fetchMonetizeListTransactions = (params: object, token:string,daleman=false) =>
    apiRequest({
            method: 'GET',
            path: '/earning/earning-history',
            params,
            token,
            daleman,

    })

export const fetchUserProfile = ( token:string, userID: string, appointmentID: string) =>
    apiRequest({
        method: 'GET',
        url: 'https://mysiloam-api-staging.siloamhospitals.com/api/v2/tele/agora/token',
        path: `/${userID}/${appointmentID}`,
        token:token,

    })



// export const endChatService = (params: object) =>
//     apiRequest({
//         method: 'POST',
//         url: 'https://gtn-dev-mysiloam-02.siloamhospitals.com/mobileinternal/api/v2/mobile/telechats/webhook/end-chat',
//         path: `/`,
//         params,
//
//     })


export const endChatService = async (params: {
    appointments: string[];
    doctorId: string;
    source: string;
    userName: string;
    userId: string;
}) => {
    const baseUrl = 'https://gtn-dev-mysiloam-02.siloamhospitals.com/mobileinternal/api/v2/mobile/telechats/webhook/end-chat';

    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        console.log('Full Response:', response);

        if (!response.ok) {
            const errorResponse = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, response: ${errorResponse}`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("[ERROR] Api Request: ", err);
        throw new Error('Auth is required to access this resource');
    }
};
