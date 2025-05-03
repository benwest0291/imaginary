<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        try{
            $request->authenticate();
            $token = $request->user()->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => $request->user(),
                'token' => $token,
            ]);

        } catch (\Illuminate\Auth\AuthenticationException $e) {
            return response()->json([
                'message' => 'Invalid credentials',
                'errors' => [
                    'email' => [$e->getMessage()],
                ],
            ], 422);
        }    
    }

    /**
     * Destroy an authenticated
     */
    public function destroy(Request $request): Response
    {
        if ($request->user()){
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logout successful',
            ]);
        }

        return response()->json([
            'message' => 'No user logged in',
        ], 401);
    }
}
