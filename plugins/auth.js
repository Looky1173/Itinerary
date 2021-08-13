export default ({ store }, inject) => {
    let auth = {
        loggedIn() {
            return !!store.state.auth.user;
        },
        user() {
            return store.state.auth.user;
        },
        token() {
            return store.state.auth.token;
        }
    };
    inject('auth', auth);
}