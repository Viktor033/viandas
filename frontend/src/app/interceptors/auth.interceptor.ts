import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userData = localStorage.getItem('user_data');
    let phone = '';

    if (userData) {
        try {
            const user = JSON.parse(userData);
            phone = user.telefono || '';
        } catch (e) {
            console.error('Error parsing user data for auth header', e);
        }
    }

    if (phone) {
        const authReq = req.clone({
            headers: req.headers.set('X-Auth-Phone', phone)
        });
        return next(authReq);
    }

    return next(req);
};
