import { useAuth } from "./useAuth";

export function useAuthFetch() {
    const {token} = useAuth()

    const authFetch = (url, options = {}) => {
        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...(options.headers ||{})
            }
        })
        .then(res => res.json())
    }
    return authFetch
}