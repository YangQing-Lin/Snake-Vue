import $ from 'jquery';

export const init = (store) => {
    const AcWingOS = store.state.AcWingOS;

    if (AcWingOS === "AcWingOS") return false;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    AcWingOS.api.window.resize(59.5 * vh / vw, 64.5);

    $.ajax({
        url: "https://app2556.acapp.acwing.com.cn:4431/apply_code/",
        type: "get",
        success: resp => {
            AcWingOS.api.oauth2.authorize(resp.appid, resp.redirect_uri, resp.scope, resp.state, resp => {
                if (resp.result === "success") {
                    store.commit('updateAccess', resp.access);
                    store.commit('udpateRefresh', resp.refresh);

                    setInterval(() => {
                        $.ajax({
                            url: "https://app2556.acapp.acwing.com.cn:4431/api/token/refresh/",
                            type: "post",
                            data: {
                                refresh: resp.refresh,
                            },
                            success: resp => {
                                store.commit('updateAccess', resp.access);
                            }
                        });
                    }, 4.5 * 60 * 1000)
                }
            });
        }
    })
}