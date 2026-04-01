import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const mockBackendInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  if (!environment.demo) {
    return next(req);
  }

  // Helper para simular un retraso de red
  const simulateDelay = <T>(body: T, status: number = 200) => {
    return of(new HttpResponse({ status, body })).pipe(delay(500));
  };

  const url = req.url;
  const method = req.method;
  
  // Extraer ID de la URL si existe (e.g. /api/cadetes/1)
  const idMatch = url.match(/\/(\d+)$/);
  const id = idMatch ? parseInt(idMatch[1], 10) : null;

  console.log(`[Mock Backend] Intercepted ${method} ${url}`);

  // Helpers LocalStorage
  const getStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
  const setStorage = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

  // -------- /api/auth --------
  if (url.includes('/api/auth/login') && method === 'POST') {
    // Aceptar cualquier cosa en la demo
    return simulateDelay({ 
        token: 'demo-token-12345',
        usuario: { id: 1, email: 'demo@demo.com', rol: 'ADMIN', nombre: 'Admin Demo' }
    });
  }

  if (url.includes('/api/auth/me') && method === 'GET') {
    return simulateDelay({ id: 1, email: 'demo@demo.com', rol: 'ADMIN', nombre: 'Admin Demo' });
  }

  // -------- /api/cadetes --------
  if (url.includes('/api/cadetes')) {
    let cadetes = getStorage('mock_cadetes');
    
    // Semilla inicial si está vacío
    if (cadetes.length === 0) {
        cadetes = [
            { id: 1, nombre: 'Juan', apellido: 'Perez', vehiculo: 'Moto', telefono: '341555555', activo: true },
            { id: 2, nombre: 'Maria', apellido: 'Gomez', vehiculo: 'Bici', telefono: '341444444', activo: false }
        ];
        setStorage('mock_cadetes', cadetes);
    }

    if (method === 'GET') {
      return simulateDelay(cadetes);
    }

    if (method === 'POST') {
      const newCadete = { ...(req.body as any), id: Date.now() };
      cadetes.push(newCadete);
      setStorage('mock_cadetes', cadetes);
      return simulateDelay(newCadete, 201);
    }

    if (method === 'PUT' && id) {
      const index = cadetes.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        cadetes[index] = { ...cadetes[index], ...(req.body as any) };
        setStorage('mock_cadetes', cadetes);
        return simulateDelay(cadetes[index]);
      }
      return throwError(() => new Error('Cadete no encontrado'));
    }

    if (method === 'DELETE' && id) {
      cadetes = cadetes.filter((c: any) => c.id !== id);
      setStorage('mock_cadetes', cadetes);
      return simulateDelay({}); // 200 OK
    }
  }

  // -------- /api/clientes --------
  if (url.includes('/api/clientes')) {
    let clientes = getStorage('mock_clientes');
    
    if (clientes.length === 0) {
        clientes = [
            { id: 1, nombre: 'Carlos', apellido: 'Lopez', telefono: '341222222', direccion: 'San martin 123', rol: 'USUARIO', activo: true, zona: 'CENTRO' }
        ];
        setStorage('mock_clientes', clientes);
    }

    if (method === 'GET') {
      return simulateDelay(clientes);
    }

    if (method === 'POST') {
      const newCliente = { ...(req.body as any), id: Date.now() };
      clientes.push(newCliente);
      setStorage('mock_clientes', clientes);
      return simulateDelay(newCliente, 201);
    }

    if (method === 'PUT' && id) {
      const index = clientes.findIndex((c: any) => c.id === id);
      if (index !== -1) {
        clientes[index] = { ...clientes[index], ...(req.body as any) };
        setStorage('mock_clientes', clientes);
        return simulateDelay(clientes[index]);
      }
      return throwError(() => new Error('Cliente no encontrado'));
    }

    if (method === 'DELETE' && id) {
      clientes = clientes.filter((c: any) => c.id !== id);
      setStorage('mock_clientes', clientes);
      return simulateDelay({}); // 200 OK
    }
  }

  // -------- /api/pedidos --------
  if (url.includes('/api/pedidos')) {
      if (method === 'GET') {
          return simulateDelay([]); // Retorna vacio para evitar errores 500 en la UI
      }
      if (method === 'DELETE') {
          return simulateDelay({ count: 1 });
      }
  }

  // Si no coincide con las rutas mockeadas pero estamos en demo, devolvemos 404
  console.warn(`[Mock Backend] Unhandled request: ${method} ${url}`);
  return next(req);
};
