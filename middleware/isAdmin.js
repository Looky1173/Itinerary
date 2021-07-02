const serverCookie = process.server ? require('cookie') : undefined;
const clientCookie = process.client ? require('js-cookie') : undefined;

export default async function ({ $auth, redirect, req, store }) {
    let token = null
    if (process.server) {
        if (req.headers.cookie) {
            const parsed = serverCookie.parse(req.headers.cookie);
            token = parsed['itinerary-token'];
        }
    } else {
        token = clientCookie.get('itinerary-token');
    }

    await store.dispatch('auth/login', token)
        .then(() => {
            if (!$auth.user().admin) {
                return redirect('/');
            }
        })
        .catch((err) => {
            console.warn(err);
            return redirect('/');
        })
}