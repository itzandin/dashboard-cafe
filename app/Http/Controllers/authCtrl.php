<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class authCtrl extends Controller
{
    function login(){
        return view('auth.login');
    }

    function cek_login(Request $req){
        // validasi
        $req -> validate(
            [
                "email" => "required",
                "password" => "required"
            ],
            [
                "email.required" => "maaf email harus di isi",
                "password.required" => "password harus di isi"
            ]

        );
        // cek login
        //if(auth())
    }
}
