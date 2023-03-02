<?php

namespace App\Http\Controllers;

use App\Models\Advance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdvanceController extends BaseController
{
    /**
     * Create advance for customer.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required',
            'amount' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = Advance::create([
                'customer_id' => $request->customer_id,
                'amount' => $request->amount,
            ]);

            if ($customer->exists)
                return $this->sendResponse($customer, 'Customer advance added successfully.');
            else
                return $this->sendError('Customer advance creation failed.');
        }
    }

    /**
     * List all customer advance.
     */
    public function list()
    {
        $advance = Advance::join('customer_enquiry', 'customer_enquiry.id', '=', 'advance.customer_id')->orderBy("advance.id", "desc")->paginate(20);

        return response()->json($advance, 200);
    }
}
