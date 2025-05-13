<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest as CoreRequest;
class EmailVerificationRequest extends CoreRequest
{
   public function user($gard = null) : mixed
   {
       return User::find($this->route('id'));   
   }
}
