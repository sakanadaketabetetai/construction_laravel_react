<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|',Rules\Password::defaults(),
            'employee_id' => 'required|string|max:6|unique:users',
        ];
    }

    public function messages(){
        return [
            'name.required' => '名前を入力してください',
            'name.string' => '名前は文字列である必要があります',
            'name.max' => '名前は255文字以内である必要があります',
            'email.required' => 'メールアドレスを入力してください',
            'email.string' => 'メールアドレスは文字列である必要があります',
            'email.email' => 'メールアドレスの形式が正しくありません',
            'email.max' => 'メールアドレスは255文字以内である必要があります',
            'email.unique' => 'このメールアドレスはすでに使用されています',
            'password.required' => 'パスワードを入力してください',
            'password.confirmed' => 'パスワードが一致しません',
            'password.string' => 'パスワードは文字列である必要があります',
            'password.min' => 'パスワードは8文字以上である必要があります',
            'password.regex' => 'パスワードは大文字、小文字、数字を含む必要があります',
            'employee_id.unique' => 'この社員IDはすでに使用されています',
            'employee_id.max' => '社員IDは6文字以内である必要があります',
            'employee_id.required' => '社員IDを入力してください',
            'employee_id.string' => '社員IDは文字列である必要があります',
            'employee_id.max' => '社員IDは6文字以内である必要があります',
            'employee_id.unique' => 'この社員IDはすでに使用されています',
        ];
    }
}
