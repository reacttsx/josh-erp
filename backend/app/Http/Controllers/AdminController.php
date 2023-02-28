<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends BaseController
{
    /**
     * Create admin user.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->sendResponse([
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 'User register successfully.');
        }
    }

    /**
     * Sign in admin user.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            if (!Auth::attempt($request->only(['email', 'password']))) {
                return $this->sendError('Email & Password does not match with our record.');
            }

            $user = Auth::user();
            $data = ['id' => $user->id, 'name' => $user->name, 'email' => $user->email, 'role' => $user->role, 'status' => $user->status, 'token' => $user->createToken("auth_token")->plainTextToken];

            return $this->sendResponse(
                $data,
                'User Logged In Successfully'
            );
        }
    }

    /**
     * Logout admin user.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse(
            '',
            'User Logout Successfully'
        );
    }
}
