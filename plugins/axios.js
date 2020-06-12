export default function ({$axios, redirect, route, store, app, res}) {

    $axios.onRequest(config => {

        if(app.$auth !== undefined && app.$auth.loggedIn === true) {
            $axios.setHeader('Authorization', app.$auth.getToken('custom'));
        }


    });

    $axios.onResponse(response => {

        if(app !== undefined && process.server === true && app.$auth !== undefined) {

            if(response.config.url.replace(response.config.baseURL, '') === 'me') {

                if(response.headers.authorization !== undefined) {
                    app.$auth.setToken('custom', response.headers.authorization);
                    res.setHeader('Set-Cookie', [
                        'auth._token.custom=' + encodeURIComponent(response.headers.authorization) + '; path=/'
                    ]);
                }

            }

        }

    });



    $axios.onError(err => {

        // const code = parseInt(err.response && err.response.status);
        //
        // if ([400, 403, 404, 500].includes(code) && err.response.config.url.indexOf('.json') === -1) {
        //     let path = '/404';
        //
        //     redirect(path)
        //
        // } else if (code === 401) {
        //     if(err.response.config.url.replace(err.response.config.baseURL, '') === 'user') {
        //         localStorage.removeItem('auth._token.custom');
        //         app.$auth.logout();
        //     }
        // }

    });


}