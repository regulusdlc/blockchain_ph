import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        //alert("Pumasok getAll()");
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        //alert("Pumasok getById()");
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        //alert("Pumasok register()");
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        //alert("Pumasok update()");
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        //alert("Pumasok delete()");
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}