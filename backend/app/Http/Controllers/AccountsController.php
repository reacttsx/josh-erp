<?php

namespace App\Http\Controllers;

use App\Models\Accounts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountsController extends BaseController
{
    /**
     * Create accounts screen.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = Accounts::create([
                'acc_date' => $request->date,
                'total_income' => $request->total_income ? $request->total_income : 0,
                'store_expense' => $request->store_expense ? $request->store_expense : 0,
                'salary_expense' => $request->salary_expense ? $request->salary_expense : 0,
                'other_expense' => $request->other_expense ? $request->other_expense : 0,
                'remarks' => $request->remarks,
            ]);

            if ($customer->exists)
                return $this->sendResponse($customer, 'Accounts details created successfully.');
            else
                return $this->sendError('Accounts details creation failed.');
        }
    }

    /**
     * List all accounts details.
     */
    public function list(Request $request)
    {
        if ($request->input('from') && $request->input('to')) {
            $customer = Accounts::whereBetween('acc_date', [$request->input('from'), $request->input('to')])->orderBy("id", "desc")->paginate(20);
        } else if ($request->input('from')) {
            $customer = Accounts::where('acc_date', '=', $request->input('from'))->orderBy("id", "desc")->paginate(20);
        } else {
            $customer = Accounts::orderBy("id", "desc")->paginate(20);
        }

        return response()->json($customer, 200);
    }
}
