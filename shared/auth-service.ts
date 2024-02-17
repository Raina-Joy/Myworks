import { HttpClient } from "@angular/common/http";
import { AuthModel } from "./auth-model";
import { Injectable } from "@angular/core";
@Injectable({providedIn:'root'})
export class AuthService
{
    constructor(private http:HttpClient, ){}
    signupUser(name:string,password:string)
    {
        const authData: AuthModel = {name:name,password:password};
        this.http.post('http://localhost:3000/sign-up',authData).subscribe(res=>
        {
            console.log(res);
        })
    }


    
}