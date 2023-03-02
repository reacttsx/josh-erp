<?php

namespace App\Http\Controllers;

use App\Models\Payments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentsController extends BaseController
{
    /**
     * Create payments for customer.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required',
            'amount' => 'required',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = Payments::create([
                'customer_id' => $request->customer_id,
                'amount' => $request->amount,
                'received_on' => $request->date,
            ]);

            if ($customer->exists)
                return $this->sendResponse($customer, 'Customer payment added successfully.');
            else
                return $this->sendError('Customer payment creation failed.');
        }
    }

    /**
     * List all customer enquiry followup.
     */
    public function list()
    {
        $payments = Payments::join('customer_enquiry', 'customer_enquiry.id', '=', 'payments.customer_id')->orderBy("payments.id", "desc")->paginate(20);

        return response()->json($payments, 200);
    }
}
